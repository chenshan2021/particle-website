#!/usr/bin/env python3
"""
股票筛选脚本
条件：
1. 市值小于500亿
2. 股价创新高
3. 连续3个交易日以上放量
4. 五日线上方
"""

import sys
sys.path.insert(0, '/root/.openclaw/venv-stock-analysis/lib/python3.12/site-packages')

import akshare as ak
import pandas as pd
from datetime import datetime, timedelta

def get_stock_list():
    """获取所有A股列表"""
    try:
        df = ak.stock_zh_a_spot_em()
        return df
    except Exception as e:
        print(f"获取股票列表失败: {e}")
        return None

def get_stock_history(stock_code, period=60):
    """获取股票历史数据"""
    try:
        # akshare的股票代码格式：沪市股票代码以'6'开头，深市股票代码以'0'或'3'开头
        # 需要转换成akshare能识别的格式
        if stock_code.startswith('6'):
            symbol = f'sh{stock_code}'
        else:
            symbol = f'sz{stock_code}'
        
        # 获取A股历史行情数据
        df = ak.stock_zh_a_hist(symbol=symbol, period="daily", start_date=(datetime.now() - timedelta(days=period)).strftime("%Y%m%d"), adjust="qfq")
        return df
    except Exception as e:
        print(f"获取{stock_code}历史数据失败: {e}")
        return None

def check_conditions(stock_code, current_data, history_df):
    """
    检查筛选条件：
    1. 市值小于500亿
    2. 股价创新高（近60日最高价）
    3. 连续3个交易日以上放量（成交量 > 5日平均成交量）
    4. 当前股价在五日线上方
    """
    try:
        # 条件1：市值小于500亿
        # 东方财富网数据中，市值字段是'总市值'
        total市值 = current_data.get('总市值', 0)
        if isinstance(total市值, str):
            total市值 = float(total市值)
        if total市值 >= 500 * 100000000:  # 500亿 = 500 * 10^8
            return False, "市值>=500亿"
        
        # 历史数据需要至少有6天（5日均线+1）
        if history_df is None or len(history_df) < 6:
            return False, "历史数据不足"
        
        # 确保数据按日期排序
        history_df = history_df.sort_values('日期')
        
        # 条件4：当前股价在五日线上方
        # 计算前5日的平均收盘价
        last_5_days = history_df.tail(6).iloc[:-1]  # 前几天（不包括今天）
        ma5 = last_5_days['收盘'].mean()
        current_price = current_data.get('最新价', 0)
        if isinstance(current_price, str):
            current_price = float(current_price)
        
        if current_price <= ma5:
            return False, f"股价({current_price:.2f})<=五日线({ma5:.2f})"
        
        # 条件2：股价创新高（近60日最高价，使用收盘价）
        max_close = history_df['收盘'].max()
        if current_price <= max_close:
            return False, f"未创新高(当前{current_price:.2f},最高{max_close:.2f})"
        
        # 条件3：连续3个交易日以上放量
        # 需要获取更长的历史数据来判断成交量
        # 先计算5日平均成交量
        vol_ma5 = history_df['成交量'].tail(5).mean()
        
        # 检查最近3天是否连续放量
        last_3_days = history_df.tail(3)  # 最近3天（包括今天）
        for idx, row in last_3_days.iterrows():
            if row['成交量'] <= vol_ma5 * 1.5:  # 放量定义为成交量 > 1.5倍平均量
                return False, f"未连续放量"
        
        return True, "符合所有条件"
        
    except Exception as e:
        return False, f"检查条件失败: {e}"

def main():
    print("开始筛选股票...")
    print("条件：")
    print("1. 市值 < 500亿")
    print("2. 股价创新高（近60日）")
    print("3. 连续3个交易日以上放量")
    print("4. 当前股价 > 五日线")
    print()
    
    # 获取实时行情
    print("正在获取A股实时行情...")
    stock_list = get_stock_list()
    if stock_list is None or len(stock_list) == 0:
        print("获取股票列表失败")
        return
    
    print(f"共获取到 {len(stock_list)} 只股票")
    print()
    
    results = []
    checked = 0
    
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
            total市值 = current_data['总市值']
            if isinstance(total市值, str):
                try:
                    total市值 = float(total市值)
                except:
                    continue
            if total市值 >= 500 * 100000000:
                continue
            
            # 获取历史数据
            history_df = get_stock_history(stock_code)
            
            # 检查条件
            is_qualified, reason = check_conditions(stock_code, current_data, history_df)
            
            checked += 1
            if checked % 100 == 0:
                print(f"已检查 {checked}/{len(stock_list)} 只股票，找到 {len(results)} 只符合条件的")
            
            if is_qualified:
                results.append({
                    '代码': stock_code,
                    '名称': stock_name,
                    '最新价': current_data['最新价'],
                    '总市值(亿)': round(total市值 / 100000000, 2),
                    '涨跌幅(%)': current_data['涨跌幅'],
                    '量比': current_data['量比'],
                    '成交额(亿)': round(current_data['成交额'] / 100000000, 2) if isinstance(current_data['成交额'], (int, float)) else current_data['成交额']
                })
                
        except Exception as e:
            print(f"处理{stock_code}出错: {e}")
            continue
    
    print(f"\n检查完成！共检查 {checked} 只股票")
    print(f"找到 {len(results)} 只符合条件的股票\n")
    
    if results:
        print("=" * 80)
        print("符合条件的股票：")
        print("=" * 80)
        print(f"{'代码':<8}{'名称':<12}{'最新价':<10}{'市值(亿)':<12}{'涨跌幅(%)':<12}{'量比':<10}{'成交额(亿)':<12}")
        print("-" * 80)
        for stock in results:
            print(f"{stock['代码']:<8}{stock['名称']:<12}{stock['最新价']:<10}{stock['总市值(亿)']:<12}{stock['涨跌幅(%)']:<12}{stock['量比']:<10}{stock['成交额(亿)']:<12}")
        print("=" * 80)
    else:
        print("未找到符合条件的股票")

if __name__ == "__main__":
    main()
