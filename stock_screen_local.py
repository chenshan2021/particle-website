#!/usr/bin/env python3
"""
股票筛选脚本 - 本地运行版本
条件：
1. 市值小于500亿
2. 股价创新高（近60日）
3. 连续3个交易日以上放量
4. 当前股价在五日线上方

运行前请先安装依赖：
pip install akshare pandas

或者在虚拟环境中运行：
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows
pip install akshare pandas
python stock_screen.py
"""

import akshare as ak
import pandas as pd
from datetime import datetime, timedelta

def get_stock_list():
    """获取所有A股列表"""
    try:
        print("正在获取A股实时行情...")
        df = ak.stock_zh_a_spot_em()
        print(f"成功获取 {len(df)} 只股票")
        return df
    except Exception as e:
        print(f"获取股票列表失败: {e}")
        return None

def get_stock_history(stock_code, days=60):
    """获取股票历史数据"""
    try:
        # 转换股票代码格式
        if stock_code.startswith('6'):
            symbol = f'sh{stock_code}'
        else:
            symbol = f'sz{stock_code}'
        
        # 计算开始日期
        start_date = (datetime.now() - timedelta(days=days)).strftime("%Y%m%d")
        
        # 获取历史行情数据
        df = ak.stock_zh_a_hist(symbol=symbol, period="daily", start_date=start_date, adjust="qfq")
        return df
    except Exception as e:
        return None

def check_conditions(stock_code, current_data, history_df):
    """
    检查筛选条件：
    1. 市值小于500亿
    2. 股价创新高（近60日）
    3. 连续3个交易日以上放量
    4. 当前股价在五日线上方
    """
    try:
        # 条件1：市值小于500亿
        # 东方财富的市值字段是'总市值'
        total_market_cap = current_data.get('总市值', 0)
        if isinstance(total_market_cap, str):
            # 可能包含"万"或"亿"等单位，需要转换
            if '亿' in str(total_market_cap):
                total_market_cap = float(total_market_cap.replace('亿', '')) * 100000000
            elif '万' in str(total_market_cap):
                total_market_cap = float(total_market_cap.replace('万', '')) * 10000
            else:
                total_market_cap = float(total_market_cap)
        
        if total_market_cap >= 500 * 100000000:  # 500亿
            return False, f"市值>=500亿 ({total_market_cap/100000000:.2f}亿)"
        
        # 检查历史数据
        if history_df is None or len(history_df) < 10:
            return False, "历史数据不足"
        
        # 确保数据按日期排序
        history_df = history_df.sort_values('日期')
        
        # 获取当前价格
        current_price = current_data.get('最新价', 0)
        if isinstance(current_price, str):
            current_price = float(current_price)
        
        # 条件4：当前股价在五日线上方
        # 计算前5日平均收盘价
        last_5_close = history_df['收盘'].tail(6).iloc[:-1].mean()  # 前5天（不包括今天）
        
        if current_price <= last_5_close:
            return False, f"股价({current_price:.2f})<=五日线({last_5_close:.2f})"
        
        # 条件2：股价创新高（近60日）
        # 使用前几天的数据（不包括今天）
        max_close = history_df['收盘'].iloc[:-1].max()
        
        if current_price <= max_close:
            return False, f"未创新高(当前{current_price:.2f},最高{max_close:.2f})"
        
        # 条件3：连续3个交易日以上放量
        # 计算前5日平均成交量
        vol_ma5 = history_df['成交量'].tail(6).iloc[:-1].mean()
        
        # 检查最近3天（包括今天）是否连续放量
        last_3_vol = history_df['成交量'].tail(3)
        for vol in last_3_vol:
            if vol <= vol_ma5 * 1.5:  # 放量定义为 > 1.5倍平均量
                return False, f"未连续放量(量比{vol/vol_ma5:.2f})"
        
        return True, "✓ 符合所有条件"
        
    except Exception as e:
        return False, f"检查失败: {e}"

def main():
    print("=" * 80)
    "                    股票筛选工具")
    print("=" * 80)
    print()
    print("筛选条件：")
    print("  1. 市值 < 500亿")
    print("  2. 股价创新高（近60日最高）")
    print("  3. 连续3个交易日以上放量（成交量 > 1.5倍5日平均量）")
    print("  4. 当前股价 > 五日线")
    print()
    
    # 获取实时行情
    stock_list = get_stock_list()
    if stock_list is None or len(stock_list) == 0:
        print("获取股票列表失败，请检查网络连接")
        return
    
    print(f"\n开始筛选，共 {len(stock_list)} 只股票...")
    print()
    
    results = []
    checked = 0
    failed = 0
    
    for idx, stock in stock_list.iterrows():
        stock_code = stock['代码']
        stock_name = stock['名称']
        
        try:
            # 获取当前数据
            current_data = {
                '代码': stock_code,
                '名称': stock_name,
                '最新价': stock.get('最新价', 0),
                '总市值': stock.get('总市值', 0),
                '涨跌幅': stock.get('涨跌幅', 0),
                '量比': stock.get('量比', 0),
                '成交额': stock.get('成交额', 0)
            }
            
            # 快速过滤：先检查市值
            try:
                total_market_cap = current_data['总市值']
                if isinstance(total_market_cap, str):
                    if '亿' in str(total_market_cap):
                        total_market_cap = float(total_market_cap.replace('亿', '')) * 100000000
                    elif '万' in str(total_market_cap):
                        total_market_cap = float(total_market_cap.replace('万', '')) * 10000
                    else:
                        total_market_cap = float(total_market_cap)
                
                if total_market_cap >= 500 * 100000000:
                    continue  # 跳过市值>=500亿的股票
            except:
                continue
            
            # 获取历史数据
            history_df = get_stock_history(stock_code)
            
            # 检查条件
            is_qualified, reason = check_conditions(stock_code, current_data, history_df)
            
            checked += 1
            if checked % 50 == 0:
                print(f"  已检查 {checked}/{len(stock_list)} 只，找到 {len(results)} 只符合条件")
            
            if is_qualified:
                # 计算市值（亿元）
                market_cap_yi = total_market_cap / 100000000
                
                results.append({
                    '代码': stock_code,
                    '名称': stock_name,
                    '最新价': f"{current_data['最新价']:.2f}",
                    '市值(亿)': f"{market_cap_yi:.2f}",
                    '涨跌幅': f"{current_data['涨跌幅']:.2f}%",
                    '量比': f"{current_data['量比']:.2f}",
                    '成交额(亿)': f"{current_data['成交额']/100000000:.2f}"
                })
                
        except Exception as e:
            failed += 1
            if failed <= 5:  # 只显示前5个错误
                print(f"  ⚠ 处理 {stock_code} {stock_name} 失败: {e}")
            continue
    
    print(f"\n✓ 筛选完成！")
    print(f"  检查了 {checked} 只股票")
    print(f"  失败 {failed} 只")
    print(f"  找到 {len(results)} 只符合条件")
    print()
    
    if results:
        print("=" * 100)
        print("  符合条件的股票：")
        print("=" * 100)
        print(f"{'代码':<10}{'名称':<12}{'最新价':<10}{'市值(亿)':<12}{'涨跌幅':<12}{'量比':<10}{'成交额(亿)':<12}")
        print("-" * 100)
        for stock in results:
            print(f"{stock['代码']:<10}{stock['名称']:<12}{stock['最新价']:<10}{stock['市值(亿)']:<12}{stock['涨跌幅']:<12}{stock['量比']:<10}{stock['成交额(亿)']:<12}")
        print("=" * 100)
        
        # 保存到CSV
        df = pd.DataFrame(results)
        csv_filename = f"stock_filtered_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        df.to_csv(csv_filename, index=False, encoding='utf-8-sig')
        print(f"\n✓ 结果已保存到: {csv_filename}")
    else:
        print("  未找到符合条件的股票")
        print()
        print("  可能的原因：")
        print("  1. 当前不是交易时间（周末、节假日）")
        print("  2. 市场没有符合条件的股票")
        print("  3. 网络连接不稳定")

if __name__ == "__main__":
    main()
