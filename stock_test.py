#!/usr/bin/env python3
"""
简化版股票筛选脚本 - 指定股票代码测试
用于测试筛选逻辑，避免一次性扫描所有股票

使用方法：
python stock_test.py

或者修改下面的 stock_codes 列表来指定要测试的股票
"""

import akshare as ak
import pandas as pd
from datetime import datetime, timedelta

# 测试股票代码（你可以修改这个列表）
stock_codes = [
    '600519',  # 贵州茅台
    '000858',  # 五粮液
    '300750',  # 宁德时代
    '000333',  # 美的集团
    '600036',  # 招商银行
    '601318',  # 中国平安
    '000651',  # 格力电器
    '600276',  # 恒瑞医药
    '300059',  # 东方财富
    '002415',  # 海康威视
]

def get_stock_info(stock_code):
    """获取股票实时信息"""
    try:
        # 转换代码格式
        if stock_code.startswith('6'):
            symbol = f'sh{stock_code}'
        else:
            symbol = f'sz{stock_code}'
        
        # 获取实时行情
        spot_df = ak.stock_zh_a_spot_em()
        stock_info = spot_df[spot_df['代码'] == stock_code]
        
        if len(stock_info) == 0:
            return None
        
        return stock_info.iloc[0].to_dict()
    except Exception as e:
        print(f"获取 {stock_code} 实时信息失败: {e}")
        return None

def get_stock_history(stock_code, days=60):
    """获取股票历史数据"""
    try:
        if stock_code.startswith('6'):
            symbol = f'sh{stock_code}'
        else:
            symbol = f'sz{stock_code}'
        
        start_date = (datetime.now() - timedelta(days=days)).strftime("%Y%m%d")
        df = ak.stock_zh_a_hist(symbol=symbol, period="daily", start_date=start_date, adjust="qfq")
        return df
    except Exception as e:
        print(f"获取 {stock_code} 历史数据失败: {e}")
        return None

def check_conditions(stock_code, stock_info, history_df):
    """检查筛选条件"""
    reasons = []
    passed = []
    
    try:
        # 条件1：市值 < 500亿
        market_cap = stock_info.get('总市值', 0)
        if isinstance(market_cap, str):
            if '亿' in market_cap:
                market_cap = float(market_cap.replace('亿', '')) * 100000000
            else:
                market_cap = float(market_cap)
        
        if market_cap < 500 * 100000000:
            passed.append(f"市值 {market_cap/100000000:.2f}亿 < 500亿")
        else:
            reasons.append(f"市值 {market_cap/100000000:.2f}亿 >= 500亿")
        
        # 历史数据检查
        if history_df is None or len(history_df) < 10:
            reasons.append("历史数据不足")
            return False, reasons, passed
        
        history_df = history_df.sort_values('日期')
        
        # 当前价格
        current_price = float(stock_info.get('最新价', 0))
        
        # 条件4：股价 > 五日线
        ma5 = history_df['收盘'].tail(6).iloc[:-1].mean()
        if current_price > ma5:
            passed.append(f"股价 {current_price:.2f} > 五日线 {ma5:.2f}")
        else:
            reasons.append(f"股价 {current_price:.2f} <= 五日线 {ma5:.2f}")
        
        # 条件2：股价创新高
        max_close = history_df['收盘'].iloc[:-1].max()
        if current_price > max_close:
            passed.append(f"股价 {current_price:.2f} 创新高（近60日最高 {max_close:.2f}）")
        else:
            reasons.append(f"股价 {current_price:.2f} 未创新高（近60日最高 {max_close:.2f}）")
        
        # 条件3：连续3日放量
        vol_ma5 = history_df['成交量'].tail(6).iloc[:-1].mean()
        last_3_vol = history_df['成交量'].tail(3)
        
        vol_count = 0
        for vol in last_3_vol:
            if vol > vol_ma5 * 1.5:
                vol_count += 1
        
        if vol_count == 3:
            passed.append(f"连续3日放量（量比均 > 1.5）")
        else:
            reasons.append(f"未连续3日放量（{vol_count}/3天放量）")
        
        return len(reasons) == 0, reasons, passed
        
    except Exception as e:
        reasons.append(f"检查失败: {e}")
        return False, reasons, passed

def main():
    print("=" * 80)
    print("  股票筛选测试（简化版）")
    print("=" * 80)
    print()
    print(f"测试股票数量: {len(stock_codes)}")
    print()
    
    qualified = []
    
    for stock_code in stock_codes:
        print(f"检查 {stock_code}...")
        
        # 获取实时信息
        stock_info = get_stock_info(stock_code)
        if stock_info is None:
            print(f"  ✗ 获取股票信息失败")
            print()
            continue
        
        stock_name = stock_info.get('名称', '未知')
        print(f"  名称: {stock_name}")
        
        # 获取历史数据
        history_df = get_stock_history(stock_code)
        
        # 检查条件
        is_qualified, reasons, passed = check_conditions(stock_code, stock_info, history_df)
        
        print(f"  ✓ 通过:")
        for p in passed:
            print(f"    - {p}")
        
        if reasons:
            print(f"  ✗ 未通过:")
            for r in reasons:
                print(f"    - {r}")
        
        if is_qualified:
            qualified.append({
                '代码': stock_code,
                '名称': stock_name,
                '最新价': stock_info.get('最新价', 0),
                '总市值': stock_info.get('总市值', 0),
                '涨跌幅': stock_info.get('涨跌幅', 0),
                '量比': stock_info.get('量比', 0),
            })
            print(f"  🎉 符合所有条件！")
        
        print()
    
    print("=" * 80)
    print(f"  测试完成！共测试 {len(stock_codes)} 只股票")
    print(f"  符合条件: {len(qualified)} 只")
    print("=" * 80)
    print()
    
    if qualified:
        print("符合条件的股票：")
        print("-" * 80)
        for stock in qualified:
            print(f"  {stock['代码']} {stock['名称']} - 价格: {stock['最新价']} - 涨跌幅: {stock['涨跌幅']}%")
        print("-" * 80)

if __name__ == "__main__":
    main()
