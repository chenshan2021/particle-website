#!/usr/bin/env python3
"""
股票筛选脚本 - 使用新浪财经API
条件：
1. 市值小于500亿
2. 股价创新高
3. 连续3个交易日以上放量
4. 五日线上方
"""

import requests
import json
import time
from datetime import datetime, timedelta

def get_stock_list_sina():
    """使用新浪API获取A股列表（简化版，只获取部分活跃股票）"""
    print("正在获取A股列表...")
    
    # 获取沪深300成分股作为示例
    url = "http://vip.stock.finance.sina.com.cn/corp/go.php/vFD_AllStockType/stockid/0.phtml"
    
    try:
        # 直接用沪市主板+深市主板的部分股票代码范围进行测试
        # 这只是一个示例，实际应用中应该获取完整的股票列表
        
        # 沪市主板：600000-604999
        # 深市主板：000001-001999
        # 深市中小板：002000-002999
        # 深市创业板：300000-300999
        
        # 为了演示，我们只检查部分热门股票代码
        test_codes = [
            # 沪市主板热门股票
            '600000', '600036', '600519', '600887', '600030',
            '600900', '601318', '601398', '601857', '601988',
            '600276', '600690', '600745', '600837', '600104',
            '600307', '600485', '600585', '600741', '600763',
            '600809', '600895', '600901', '600926', '600958',
            '600025', '600029', '600031', '600036', '600048',
            # 深市主板热门股票  
            '000001', '000002', '000063', '000066', '000069',
            '000157', '000333', '000338', '000406', '000425',
            '000538', '000568', '000625', '000651', '000723',
            '000725', '000768', '000783', '000792', '000798',
            '000858', '000869', '000876', '000895', '000901',
            # 深市创业板热门股票
            '300003', '300009', '300012', '300014', '300015',
            '300033', '300037', '300058', '300059', '300070',
            '300122', '300124', '300142', '300144', '300145',
            '300274', '300347', '300363', '300433', '300450',
            '300474', '300482', '300496', '300498', '300502',
            '300750', '300760', '300763', '300765', '300768',
            '300771', '300782', '304159', '304321', '304601',
        ]
        
        stock_list = []
        for code in test_codes:
            stock_list.append({
                'code': code,
                'name': f'股票{code}'
            })
        
        print(f"获取到 {len(stock_list)} 只股票（测试用部分股票）")
        return stock_list
        
    except Exception as e:
        print(f"获取股票列表失败: {e}")
        return []

def get_realtime_quote_sina(stock_code):
    """使用新浪API获取实时行情"""
    try:
        # 新浪财经实时行情接口
        if stock_code.startswith('6'):
            symbol = f'sh{stock_code}'
        else:
            symbol = f'sz{stock_code}'
        
        url = f"https://hq.sinajs.cn/list={symbol}"
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            content = response.text
            # 解析数据
            start = content.index('"')
            end = content.rindex('"')
            data_str = content[start+1:end]
            items = data_str.split(',')
            
            if len(items) >= 32:
                return {
                    'name': items[0],  # 股票名称
                    'open': float(items[1]),  # 开盘价
                    'pre_close': float(items[2]),  # 昨收价
                    'close': float(items[3]),  # 当前价
                    'high': float(items[4]),  # 最高价
                    'low': float(items[5]),  # 最低价
                    'buy': float(items[6]),  # 买一价
                    'sell': float(items[7]),  # 卖一价
                    'volume': int(items[8]),  # 成交量（手）
                    'amount': float(items[9]),  # 成交额（元）
                    'date': items[30],  # 日期
                    'time': items[31],  # 时间
                }
    except Exception as e:
        pass
    
    return None

def get_history_sina(stock_code, days=60):
    """使用新浪API获取历史数据"""
    try:
        if stock_code.startswith('6'):
            symbol = f'sh{stock_code}'
        else:
            symbol = f'sz{stock_code}'
        
        # 新浪财经历史数据接口
        url = f"https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol={symbol}&scale=240&ma=no&datalen={days}"
        
        headers = {
            'Referer': 'https://finance.sina.com.cn',
            'User-Agent': 'Mozilla/5.0'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = json.loads(response.text)
            return data
    except Exception as e:
        pass
    
    return None

def check_conditions(stock_code, current_data, history_data):
    """检查筛选条件"""
    try:
        # 条件1：市值小于500亿
        # 新浪API不直接提供市值，需要估算：市值 = 股价 * 总股本
        # 由于获取总股本比较复杂，这里先跳过市值检查，或者使用其他方法
        # 暂时跳过此条件
        
        if history_data is None or len(history_data) < 6:
            return False, "历史数据不足"
        
        # 新浪API返回的数据格式可能不同，需要适配
        # 假设返回的是包含日期、开盘、收盘、最高、最低、成交量的列表
        
        # 条件2：股价创新高
        # 找出近60日最高收盘价
        max_close = max(float(d['close']) for d in history_data[:-1])  # 不包括今天
        current_price = current_data['close']
        
        if current_price <= max_close:
            return False, f"未创新高"
        
        # 条件4：当前股价 > 五日线
        # 计算前5日平均收盘价
        last_5 = history_data[-6:-1]  # 前5天（不包括今天）
        ma5 = sum(float(d['close']) for d in last_5) / 5
        
        if current_price <= ma5:
            return False, f"股价<=五日线"
        
        # 条件3：连续3个交易日以上放量
        # 计算前5日平均成交量
        last_5_vol = history_data[-6:-1]
        vol_ma5 = sum(int(d['volume']) for d in last_5_vol) / 5
        
        # 检查最近3天是否连续放量（成交量 > 1.5倍平均量）
        last_3 = history_data[-3:]
        for d in last_3:
            if int(d['volume']) <= vol_ma5 * 1.5:
                return False, "未连续放量"
        
        return True, "符合条件"
        
    except Exception as e:
        return False, f"检查失败: {e}"

def main():
    print("开始筛选股票（使用新浪财经数据源）...")
    print("条件：")
    print("1. 市值 < 500亿（暂未实现）")
    print("2. 股价创新高（近60日）")
    print("3. 连续3个交易日以上放量")
    print("4. 当前股价 > 五日线")
    print()
    
    # 获取股票列表
    stock_list = get_stock_list_sina()
    if not stock_list:
        print("获取股票列表失败")
        return
    
    results = []
    checked = 0
    
    for stock in stock_list:
        stock_code = stock['code']
        
        try:
            # 获取实时行情
            current_data = get_realtime_quote_sina(stock_code)
            if current_data is None:
                continue
            
            # 获取历史数据
            history_data = get_history_sina(stock_code, days=60)
            if history_data is None:
                continue
            
            # 检查条件
            is_qualified, reason = check_conditions(stock_code, current_data, history_data)
            
            checked += 1
            print(f"检查 {stock_code} {current_data['name']}: {reason}")
            
            if is_qualified:
                # 计算涨跌幅
                change_pct = ((current_data['close'] - current_data['pre_close']) / current_data['pre_close']) * 100 if current_data['pre_close'] > 0 else 0
                
                # 计算量比（这里简化处理）
                if len(history_data) >= 2:
                    vol_ratio = history_data[-1]['volume'] / history_data[-2]['volume'] if history_data[-2]['volume'] > 0 else 0
                else:
                    vol_ratio = 0
                
                results.append({
                    '代码': stock_code,
                    '名称': current_data['name'],
                    '最新价': current_data['close'],
                    '涨跌幅(%)': f"{change_pct:.2f}%",
                    '量比': f"{vol_ratio:.2f}",
                    '成交额(亿)': f"{current_data['amount'] / 100000000:.2f}"
                })
            
            # 避免请求过快
            time.sleep(0.5)
            
        except Exception as e:
            print(f"处理{stock_code}出错: {e}")
            continue
    
    print(f"\n检查完成！共检查 {checked} 只股票")
    print(f"找到 {len(results)} 只符合条件的股票\n")
    
    if results:
        print("=" * 80)
        print("符合条件的股票：")
        print("=" * 80)
        print(f"{'代码':<10}{'名称':<12}{'最新价':<12}{'涨跌幅(%)':<12}{'量比':<12}{'成交额(亿)':<12}")
        print("-" * 80)
        for stock in results:
            print(f"{stock['代码']:<10}{stock['名称']:<12}{stock['最新价']:<12}{stock['涨跌幅(%)']:<12}{stock['量比']:<12}{stock['成交额(亿)']:<12}")
        print("=" * 80)
    else:
        print("未找到符合条件的股票")

if __name__ == "__main__":
    main()
