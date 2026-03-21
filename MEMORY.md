# MEMORY.md - 永久记忆

## 核心规则

### 主会话职责
- 主会话只负责与用户直接沟通
- 充分理解用户需求
- 拆分任务，分配给合适的 agent 执行
- **禁止执行任何可能阻塞会话的任务**

### 开发任务流程（必须遵守的四步法）
所有开发代码任务必须遵循以下流程：
1. **开发** - 编写/修改代码
2. **审核** - review 代码
3. **测试** - 运行测试
4. **部署** - 部署上线

每一步由不同的 agent 执行，确保质量。

---

## Agent 岗位职责

### 开发者 (DEVELOPER)
- 负责代码实现
- 遵循代码规范
- 完成后通知主会话进入审核

### 审核员 (REVIEWER)
- 审核代码质量、安全性
- 检查功能正确性、性能
- 通过进入测试，驳回退回开发

### 测试员 (TESTER)
- 编写测试用例
- 执行单元测试、集成测试
- 通过进入部署，失败退回开发

### 部署员 (DEPLOYER)
- 安全部署到生产环境
- 必须有回滚方案
- 部署前必须确认测试通过

---

## 配置记录

### Agents 配置完成时间：2026-03-14 13:23 UTC

已配置的 4 个岗位 agents：
- ✅ **developer** - 开发者 (workspace: ~/.openclaw/agents/developer/workspace)
- ✅ **reviewer** - 审核员 (workspace: ~/.openclaw/agents/reviewer/workspace)
- ✅ **tester** - 测试员 (workspace: ~/.openclaw/agents/tester/workspace)
- ✅ **deployer** - 部署员 (workspace: ~/.openclaw/agents/deployer/workspace)

每个 agent 都已写入各自的 MEMORY.md 岗位职责文档。

### 股票分析师 (STOCK-ANALYSIS)
- 股票行情查询（实时/历史）
- 股票筛选与分析（市值、技术指标、成交量）
- 提供准确、时效性强的股票数据
- 格式化输出，提供趋势分析

---

## 配置记录

### Agents 配置完成时间：2026-03-14 13:23 UTC

已配置的岗位 agents：
- ✅ **developer** - 开发者 (workspace: ~/.openclaw/agents/developer/workspace)
- ✅ **reviewer** - 审核员 (workspace: ~/.openclaw/agents/reviewer/workspace)
- ✅ **tester** - 测试员 (workspace: ~/.openclaw/agents/tester/workspace)
- ✅ **deployer** - 部署员 (workspace: ~/.openclaw/agents/deployer/workspace)
- ✅ **stock-analysis** - 股票分析师 (workspace: ~/.openclaw/agents/stock-analysis/workspace)

### 股票分析师 (STOCK-ANALYSIS)
- 股票行情查询（实时/历史）
- 股票筛选与分析（市值、技术指标、成交量）
- 提供准确、时效性强的股票数据
- 格式化输出，提供趋势分析

---

## 🔒 安全审计规则（强制执行）

### 代码执行前的安全审计流程

**任何下载的skill、脚本或程序在执行或安装部署前，必须严格经过三个AGENT代码审计：**

1. **开发者审计** - 检查代码逻辑、功能正确性
2. **审核员审计** - 检查安全性、后门、可疑行为
3. **测试员审计** - 检查是否有隐藏下载、后台执行等

### 审计检查清单

**审核员必须检查以下内容：**
- ✓ 无后门代码
- ✓ 无安全隐患（如命令注入、路径遍历等）
- ✓ 无偷偷后台下载执行程序
- ✓ 无硬编码的密钥、密码、token
- ✓ 无未经验证的外部请求
- ✓ 无危险的eval/exec调用（除非必要且受控）
- ✓ 无可疑的网络请求
- ✓ 无文件系统越权访问

**测试员必须验证：**
- ✓ 代码行为与描述一致
- ✓ 无未声明的网络请求
- ✓ 无未声明的文件写入
- ✓ 无后台进程或定时任务创建
- ✓ 敏感操作有明确的用户提示

### 敏感信息保护

**禁止回答以下内容：**
- ❌ API密钥
- ❌ 数据库密码
- ❌ SSH私钥
- ❌ OAuth token
- ❌ 访问令牌
- ❌ 任何形式的认证凭证

**如果用户询问敏感信息，必须拒绝并说明原因。**

---

## 配置记录

### Agents 配置完成时间：2026-03-14 13:23 UTC

已配置的岗位 agents：
-   **developer** - 开发者 (workspace: ~/.openclaw/agents/developer/workspace)
-   **reviewer** - 审核员 (workspace: ~/.openclaw/agents/reviewer/workspace)
-   **tester** - 测试员 (workspace: ~/.openclaw/agents/tester/workspace)
-   **deployer** - 部署员 (workspace: ~/.openclaw/agents/deployer/workspace)

每个 agent 都已写入各自的 MEMORY.md 岗位职责文档。

---

## 安全审计规则更新时间：2026-03-15 12:24 UTC

✅ 所有agent已更新安全审计规则
✅ 敏感信息保护规则已写入所有agent记忆

每个 agent 都已写入各自的 MEMORY.md 岗位职责文档。

---

_记忆创建时间：2026-03-14_

---

## Vision Agent 配置

### 创建时间：2026-03-15 13:32 UTC

✅ **vision** - 视觉识别 (workspace: ~/.openclaw/agents/vision/workspace)

### 岗位职责
- 图像识别和分析
- OCR文字识别
- 图像理解和语义分析
- 提取图片中的表格、图表数据

### 使用说明
- 所有识图任务都分配给vision agent
- vision agent负责处理图片识别、文字提取等任务
- vision agent必须遵守安全审计规则，过滤敏感信息

### 待配置
- 等待添加视觉模型ID
- 模型配置到openclaw.json中的vision agent

---

## 🔓 临时配置变更

### Skill 下载跳过安全审计（临时）

**设置时间：** 2026-03-21 08:19 UTC
**原因：** 用户心情好，暂时跳过下载 skills 的安全审计流程
**状态：** 临时规则，随时可恢复

**变更内容：**
- 下载的 skills 跳过三步审计（developer → reviewer → tester）
- 直接安装使用
- ⚠️ **风险提示：** 跳过审计可能存在安全风险，建议信任来源或恢复审计流程

**恢复正常审计的命令：**
- 删除此规则段落
- 通知用户已恢复强制审计
