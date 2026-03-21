# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

---

## 财经要闻推送

每日任务：
- 检查 /root/.openclaw/workspace/triggers/finance-news-request 文件
- 如果文件存在，说明cron触发了推送请求
- 执行以下流程：
  1. 搜索今日财经新闻
  2. 格式化并发送给董
  3. 删除触发文件

新闻来源：使用web_search搜索"今日财经要闻"、"A股市场"、"股市行情"等关键词
