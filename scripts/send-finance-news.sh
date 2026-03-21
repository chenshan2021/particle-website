#!/bin/bash
# 财经要闻推送脚本

# 工作目录
WORKSPACE="/root/.openclaw/workspace"
cd "$WORKSPACE"

# 生成日期（北京时间）
DATE=$(TZ='Asia/Shanghai' date "+%Y年%m月%d日")

# 创建一个触发文件，让主会话的心跳检测到
echo "$DATE" > "$WORKSPACE/triggers/finance-news-request"

# 通过openclaw CLI发送消息给主会话，触发财经新闻推送
# 使用正确的Discord channel ID
openclaw message send --channel discord --target "channel:1482396898944876735" --message "📰 $DATE 财经要闻推送请求" --silent &

