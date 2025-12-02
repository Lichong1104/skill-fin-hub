import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TEMPLATE_QUESTIONS = [
  "什么是RAG技术？",
  "如何开始学习大模型？",
  "Prompt工程的核心要点是什么？",
  "AI Agent和传统程序有什么区别？",
  "如何评估模型的输出质量？",
  "LangChain适合什么场景？"
];

const AI_RESPONSES: { [key: string]: string } = {
  "什么是RAG技术？": `RAG（Retrieval-Augmented Generation，检索增强生成）是一种结合了信息检索和文本生成的AI技术。

**核心原理：**
1. 📚 检索阶段：从知识库中找到与问题相关的文档片段
2. 🤖 生成阶段：将检索到的内容作为上下文，让大模型生成回答

**主要优势：**
✓ 基于真实数据回答，减少AI幻觉
✓ 可以随时更新知识库，无需重新训练模型
✓ 能够引用信息来源，提高可信度

**应用场景：**
• 企业知识库问答
• 智能客服系统
• 研究报告分析
• 法律文档检索

您可以在"知识学习中心"的RAG课程中深入学习！`,

  "如何开始学习大模型？": `作为初学者，建议按照以下路径循序渐进：

**第一阶段：基础认知**
1. 了解大模型的基本概念和应用场景
2. 学习如何调用API（OpenAI、Anthropic等）
3. 掌握Prompt工程基础

**第二阶段：实践技能**
1. 学习使用LangChain框架
2. 实践文档处理和向量化
3. 构建简单的RAG系统

**第三阶段：进阶应用**
1. 学习AI Agent开发
2. 多模态处理（文本、图像、语音）
3. 完成综合项目

**推荐学习路径：**
→ 知识学习中心：打好理论基础
→ 技能训练场：动手练习
→ 项目实战坊：综合应用

每个阶段都在我们的平台上有对应的课程和练习！`,

  "Prompt工程的核心要点是什么？": `优秀的Prompt设计遵循以下核心原则：

**1. 角色设定 (Role)**
明确告诉AI它的身份和专业领域
例：*"你是一位资深的金融分析师..."*

**2. 任务描述 (Task)**
清晰说明你想要AI完成什么
例：*"请分析以下财报数据..."*

**3. 上下文提供 (Context)**
给出必要的背景信息
例：*"这是一家科技公司的Q3财报..."*

**4. 格式要求 (Format)**
指定输出的格式和结构
例：*"请以JSON格式输出..."*

**5. 约束条件 (Constraints)**
说明限制和注意事项
例：*"回答不超过200字，使用专业术语..."*

**进阶技巧：**
• Few-shot学习：提供2-3个示例
• 思维链（CoT）：要求展示推理过程
• 自我验证：让AI检查自己的答案

在"项目实战坊"的"金融提示词工程"实验中可以深入实践！`,

  "AI Agent和传统程序有什么区别？": `AI Agent与传统程序的核心区别在于**自主性**和**智能性**：

**传统程序：**
❌ 遵循固定的if-else逻辑
❌ 无法处理未预设的情况
❌ 需要人工编写所有分支

**AI Agent：**
✅ 能够自主感知环境
✅ 基于目标进行推理决策
✅ 动态选择和使用工具
✅ 适应新情况和需求

**工作流程对比：**

传统程序：
输入 → 固定逻辑 → 输出

AI Agent：
目标设定 → 感知环境 → 推理规划 → 执行行动 → 观察结果 → 循环优化

**典型应用：**
• 自动化风险监控
• 智能客服系统  
• 研究助手
• 代码生成工具

想学习如何开发Agent？查看"AI风险控制智能体"实战项目！`,

  "如何评估模型的输出质量？": `评估大模型输出质量需要多维度考量：

**1. 准确性 (Accuracy)**
• 事实是否正确？
• 数据是否准确？
• 逻辑是否严密？

**2. 相关性 (Relevance)**  
• 是否回答了用户的问题？
• 内容是否聚焦主题？
• 有无偏离话题？

**3. 完整性 (Completeness)**
• 是否覆盖了所有要点？
• 信息是否充分？
• 有无遗漏关键内容？

**4. 安全性 (Safety)**
• 是否包含有害内容？
• 是否符合合规要求？
• 有无偏见或歧视？

**5. 可用性 (Usability)**
• 格式是否规范？
• 表达是否清晰？
• 是否易于理解和使用？

**实用工具：**
• RAG系统：通过引用来源验证准确性
• 人工评估：关键场景需要专家审核
• A/B测试：对比不同Prompt的效果

在实战项目中，我们会教你如何建立评估体系！`,

  "LangChain适合什么场景？": `LangChain是一个强大的LLM应用开发框架，特别适合以下场景：

**最佳应用场景：**

📚 **知识库问答**
• 构建RAG系统
• 企业文档检索
• 智能客服

🔗 **多步骤任务**
• 需要多次调用LLM
• 工作流编排
• 链式推理

🛠️ **工具集成**
• 需要调用外部API
• 数据库查询
• 网页爬取

💬 **对话应用**
• 需要记忆上下文
• 多轮对话
• 个性化交互

**LangChain核心组件：**

1. **Models**：统一的LLM接口
2. **Prompts**：提示词模板管理  
3. **Chains**：工作流编排
4. **Memory**：对话历史管理
5. **Agents**：自主任务规划
6. **Retrievers**：文档检索

**何时不用LangChain？**
• 简单的单次API调用
• 对性能要求极高的场景
• 需要完全自定义控制流程

想深入学习？访问"技能训练场"的LangChain实战练习！`
};

const DEFAULT_RESPONSE = `这是一个很好的问题！作为AI金融学习助手，我建议您：

📚 浏览**知识学习中心**了解相关理论
💪 前往**技能训练场**进行实践练习  
🚀 在**项目实战坊**中应用所学知识

如果您对具体的课程或实验有疑问，可以：
• 查看课程详情页的学习目标
• 参考代码示例进行学习
• 按照实验步骤逐步完成

祝您学习愉快！有任何问题随时问我。`;

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "您好！我是您的AI学习助手 🤖\n\n我可以帮您解答关于大模型、RAG、Prompt工程等方面的问题。您可以点击下方的建议问题，或者直接输入您的疑问。"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (question: string) => {
    if (!question.trim()) return;

    // 添加用户消息
    const userMessage: Message = { role: "user", content: question };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // 模拟AI思考延迟
    setTimeout(() => {
      const response = AI_RESPONSES[question] || DEFAULT_RESPONSE;
      const aiMessage: Message = { role: "assistant", content: response };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleTemplateClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* 浮动触发按钮 */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elegant z-50 bg-gradient-to-br from-primary to-primary/80 hover:shadow-2xl transition-all duration-300 hover:scale-110"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {/* 对话窗口 */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[380px] h-[600px] shadow-2xl z-50 flex flex-col border-2">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI学习助手</CardTitle>
                  <p className="text-xs text-muted-foreground">随时为您解答</p>
                </div>
              </div>
              <Badge variant="secondary" className="gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                在线
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* 消息区域 */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-xs text-muted-foreground">正在思考...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* 建议问题 - 始终显示 */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground">快速提问</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATE_QUESTIONS.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-2 px-3 justify-start text-left"
                    onClick={() => handleTemplateClick(q)}
                    disabled={isTyping}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                  placeholder="输入您的问题..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};