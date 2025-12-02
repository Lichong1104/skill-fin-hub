import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Target, Code, CheckCircle2, Lightbulb } from "lucide-react";

// 课程数据
const coursesData: Record<string, any> = {
  "llm-basics": {
    title: "大语言模型工作原理",
    category: "AI基础知识",
    level: "基础",
    duration: "45分钟",
    description: "深入理解Transformer架构、注意力机制和LLM的核心原理",
    objectives: [
      "理解Transformer架构的核心组件和工作流程",
      "掌握自注意力机制(Self-Attention)的计算原理",
      "了解预训练和微调的区别与应用场景",
      "认识主流大语言模型的技术特点"
    ],
    content: [
      {
        section: "1. Transformer架构概述",
        text: "Transformer是现代大语言模型的基础架构，由Google在2017年提出。它摒弃了传统的循环神经网络(RNN)结构，完全基于注意力机制来处理序列数据。\n\nTransformer的核心优势：\n• 并行计算能力强，训练效率高\n• 能够捕捉长距离依赖关系\n• 模型可扩展性好，支持大规模训练"
      },
      {
        section: "2. 自注意力机制",
        text: "自注意力机制是Transformer的核心创新。它允许模型在处理每个词时，关注到输入序列中的所有其他词。\n\n计算过程：\n1. 将输入词转换为Query(Q)、Key(K)、Value(V)三个向量\n2. 计算Query与所有Key的相似度得分\n3. 对得分进行softmax归一化\n4. 用归一化后的得分对Value进行加权求和",
        code: `# 简化的自注意力计算示例
import numpy as np

def self_attention(Q, K, V):
    """
    Q: Query矩阵 [seq_len, d_k]
    K: Key矩阵 [seq_len, d_k]
    V: Value矩阵 [seq_len, d_v]
    """
    d_k = Q.shape[-1]
    
    # 计算注意力得分
    scores = np.dot(Q, K.T) / np.sqrt(d_k)
    
    # Softmax归一化
    attention_weights = np.exp(scores) / np.sum(np.exp(scores), axis=-1, keepdims=True)
    
    # 加权求和
    output = np.dot(attention_weights, V)
    
    return output, attention_weights

# 示例使用
seq_len, d_model = 5, 64
Q = np.random.randn(seq_len, d_model)
K = np.random.randn(seq_len, d_model)
V = np.random.randn(seq_len, d_model)

output, weights = self_attention(Q, K, V)
print(f"输出形状: {output.shape}")
print(f"注意力权重形状: {weights.shape}")`
      },
      {
        section: "3. 预训练与微调",
        text: "大语言模型的训练通常分为两个阶段：\n\n预训练阶段：\n• 在大规模无标注文本上进行训练\n• 学习语言的通用知识和模式\n• 采用自监督学习方式（如掩码语言模型）\n\n微调阶段：\n• 在特定任务的标注数据上进行训练\n• 适配模型到具体应用场景\n• 保留预训练的知识，学习任务特定的能力"
      },
      {
        section: "4. 主流LLM技术特点",
        text: "• GPT系列：采用单向Transformer解码器，擅长文本生成\n• BERT：采用双向Transformer编码器，擅长理解任务\n• T5：统一的编码器-解码器架构，适合多种NLP任务\n• LLaMA/Mistral：开源模型，注重效率和可部署性"
      }
    ],
    keyPoints: [
      "Transformer通过自注意力机制实现并行计算",
      "预训练学习通用知识，微调适配具体任务",
      "多头注意力机制能够从多个角度理解文本",
      "位置编码为模型提供序列顺序信息"
    ]
  },
  "prompt-engineering": {
    title: "Prompt Engineering基础",
    category: "AI基础知识",
    level: "基础",
    duration: "30分钟",
    description: "掌握提示词工程的基本方法和最佳实践",
    objectives: [
      "理解Prompt的结构和组成要素",
      "掌握Zero-shot、Few-shot等提示技巧",
      "学会设计清晰、有效的提示词",
      "了解常见的提示词优化方法"
    ],
    content: [
      {
        section: "1. Prompt的基本结构",
        text: "一个高质量的Prompt通常包含以下要素：\n\n• 角色设定：告诉AI扮演什么角色\n• 任务描述：明确要完成的任务\n• 上下文信息：提供必要的背景知识\n• 输出格式：指定期望的输出形式\n• 约束条件：限定回答的范围和要求"
      },
      {
        section: "2. Zero-shot与Few-shot",
        text: "Zero-shot Prompting：\n直接描述任务，不提供示例\n适用于：简单任务、模型能力强的场景\n\nFew-shot Prompting：\n提供几个示例来演示任务\n适用于：复杂任务、需要特定格式的场景",
        code: `# Zero-shot示例
prompt_zero = """
请将以下句子翻译成英文：
今天天气真好。
"""

# Few-shot示例
prompt_few = """
请将以下句子翻译成英文：

示例1:
中文：你好
英文：Hello

示例2:
中文：谢谢
英文：Thank you

现在翻译：
中文：今天天气真好。
英文：
"""`
      },
      {
        section: "3. 提示词优化技巧",
        text: "明确性原则：\n• 使用具体、清晰的语言\n• 避免模糊和歧义的表述\n• 提供足够的上下文信息\n\n结构化原则：\n• 使用分隔符区分不同部分\n• 采用编号或标记组织内容\n• 保持逻辑清晰\n\n迭代优化：\n• 测试不同的表述方式\n• 根据输出结果调整提示词\n• 收集有效的提示词模板"
      },
      {
        section: "4. 高级技巧",
        text: "Chain of Thought (思维链)：\n引导模型逐步推理，提高复杂问题的准确性\n\nRole Prompting (角色提示)：\n让模型扮演专家角色，获得更专业的回答\n\nSelf-Consistency (自我一致性)：\n多次生成答案，选择最一致的结果",
        code: `# Chain of Thought示例
prompt_cot = """
问题：一个商店有23个苹果，卖出17个，又进货30个。现在有多少个苹果？

让我们一步步思考：
1. 初始苹果数：23个
2. 卖出后剩余：23 - 17 = 6个
3. 进货后总数：6 + 30 = 36个

答案：36个苹果
"""

# Role Prompting示例
prompt_role = """
你是一位资深的金融分析师，拥有20年的投资经验。
请分析以下公司的财务状况...
"""`
      }
    ],
    keyPoints: [
      "清晰明确的指令是有效Prompt的基础",
      "Few-shot能显著提升复杂任务的表现",
      "思维链技巧适合需要推理的任务",
      "不断测试和优化提示词是必要的"
    ]
  },
  "rag-tech": {
    title: "RAG技术详解",
    category: "AI基础知识",
    level: "进阶",
    duration: "60分钟",
    description: "检索增强生成技术的原理、架构和实践应用",
    objectives: [
      "理解RAG的核心概念和技术架构",
      "掌握文档处理和向量化的方法",
      "学会构建检索系统",
      "了解RAG的优化策略和最佳实践"
    ],
    content: [
      {
        section: "1. RAG技术概述",
        text: "检索增强生成(Retrieval-Augmented Generation, RAG)是一种结合信息检索和文本生成的技术架构。\n\n核心思想：\n• 从知识库中检索相关信息\n• 将检索结果作为上下文提供给LLM\n• 生成基于事实的、准确的回答\n\n优势：\n• 减少模型幻觉，提高准确性\n• 支持实时信息更新\n• 降低模型训练成本"
      },
      {
        section: "2. RAG技术架构",
        text: "典型的RAG系统包含以下组件：\n\n数据处理层：\n• 文档加载与解析\n• 文本分块(Chunking)\n• 向量化(Embedding)\n\n检索层：\n• 向量数据库\n• 相似度搜索\n• 结果排序与过滤\n\n生成层：\n• Prompt构建\n• LLM推理\n• 答案生成",
        code: `# RAG系统基本实现示例
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# 1. 加载文档
loader = TextLoader("knowledge_base.txt")
documents = loader.load()

# 2. 文本分块
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
texts = text_splitter.split_documents(documents)

# 3. 向量化并存储
embeddings = OpenAIEmbeddings()
vectordb = Chroma.from_documents(
    documents=texts,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# 4. 构建RAG链
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=vectordb.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True
)

# 5. 查询
query = "什么是Transformer架构？"
result = qa_chain({"query": query})
print(result["result"])`
      },
      {
        section: "3. 文档分块策略",
        text: "文档分块是RAG系统中的关键步骤，影响检索质量和生成效果。\n\n常用分块方法：\n• 固定长度分块：简单高效，但可能破坏语义\n• 句子分块：保持语义完整性\n• 段落分块：适合结构化文档\n• 语义分块：基于主题边界分割\n\n分块参数：\n• chunk_size：每个块的大小（token数）\n• chunk_overlap：块之间的重叠部分\n• 建议：chunk_size 500-1000，overlap 100-200"
      },
      {
        section: "4. RAG优化技巧",
        text: "检索优化：\n• 混合检索：结合向量检索和关键词检索\n• 重排序：使用专门的重排序模型\n• 元数据过滤：基于时间、来源等过滤结果\n\n生成优化：\n• Prompt工程：优化检索结果的组织方式\n• 上下文压缩：总结或筛选检索内容\n• 引用验证：确保答案基于检索内容\n\n系统优化：\n• 缓存机制：缓存常见查询结果\n• 并行处理：并行执行检索和生成\n• 监控与反馈：收集用户反馈持续改进"
      }
    ],
    keyPoints: [
      "RAG结合检索和生成，减少模型幻觉",
      "文档分块策略影响检索质量",
      "向量数据库是RAG的核心组件",
      "混合检索和重排序能提升准确性"
    ]
  },
  "ai-agent": {
    title: "AI Agent架构设计",
    category: "AI基础知识",
    level: "进阶",
    duration: "50分钟",
    description: "理解自主智能体的设计模式和实现方法",
    objectives: [
      "理解AI Agent的核心概念和组成要素",
      "掌握ReAct、Plan-and-Execute等主流Agent框架",
      "学会设计Agent的工具调用和记忆机制",
      "了解Multi-Agent系统的协作模式"
    ],
    content: [
      {
        section: "1. AI Agent概述",
        text: "AI Agent是一种能够自主感知环境、做出决策并执行行动的智能系统。与传统的问答式AI不同，Agent具备主动性和自主性。\n\nAgent的核心能力：\n• 感知：理解用户意图和环境状态\n• 规划：制定达成目标的行动计划\n• 行动：调用工具执行具体任务\n• 学习：从反馈中改进行为"
      },
      {
        section: "2. Agent核心组件",
        text: "一个完整的AI Agent通常包含以下组件：\n\n大脑(Brain)：\n• 基于LLM的推理引擎\n• 负责理解、规划和决策\n\n记忆(Memory)：\n• 短期记忆：当前对话上下文\n• 长期记忆：持久化的知识和经验\n\n工具(Tools)：\n• 代码执行、网络搜索、API调用等\n• 扩展Agent的能力边界\n\n规划(Planning)：\n• 任务分解和步骤编排\n• 反思和自我纠错",
        code: `# LangChain Agent示例
from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.llms import OpenAI
from langchain.tools import DuckDuckGoSearchRun

# 定义工具
search = DuckDuckGoSearchRun()
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="搜索互联网获取最新信息"
    )
]

# 初始化Agent
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools, 
    llm, 
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# 运行Agent
result = agent.run("最近有什么重要的AI新闻？")
print(result)`
      },
      {
        section: "3. ReAct框架",
        text: "ReAct(Reasoning and Acting)是最流行的Agent框架之一，它将推理和行动交织进行。\n\n工作流程：\n1. Thought(思考)：分析当前状态，思考下一步\n2. Action(行动)：选择并执行一个工具\n3. Observation(观察)：获取工具执行结果\n4. 重复以上步骤直到任务完成\n\n优势：\n• 推理过程透明可解释\n• 能够根据中间结果调整策略\n• 支持复杂多步任务"
      },
      {
        section: "4. Multi-Agent协作",
        text: "复杂任务往往需要多个专业Agent协作完成。\n\n协作模式：\n• 层级模式：主Agent协调子Agent\n• 对等模式：Agent之间平等协商\n• 流水线模式：任务按序传递\n\n应用场景：\n• 软件开发团队模拟\n• 研究分析协作\n• 客服多轮对话\n\n框架推荐：\n• CrewAI：角色分工协作\n• AutoGen：对话式Agent协作\n• LangGraph：状态机驱动"
      }
    ],
    keyPoints: [
      "Agent = LLM + 工具 + 记忆 + 规划",
      "ReAct框架通过推理-行动循环解决问题",
      "工具调用扩展了LLM的能力边界",
      "Multi-Agent适合复杂协作任务"
    ]
  },
  "smart-research": {
    title: "智能投研系统",
    category: "金融科技应用",
    level: "核心",
    duration: "40分钟",
    description: "AI在投资研究领域的应用案例和技术架构",
    objectives: [
      "理解智能投研系统的整体架构",
      "掌握金融数据处理和分析方法",
      "学会构建自动化研报生成系统",
      "了解投研领域的AI最佳实践"
    ],
    content: [
      {
        section: "1. 智能投研概述",
        text: "智能投研系统利用AI技术革新传统投资研究流程，提升研究效率和质量。\n\n核心价值：\n• 海量信息高效处理\n• 24/7持续监控市场\n• 量化分析与定性洞察结合\n• 减少人为偏见和遗漏"
      },
      {
        section: "2. 数据采集与处理",
        text: "智能投研的基础是高质量的数据源。\n\n数据类型：\n• 结构化数据：财务报表、行情数据\n• 非结构化数据：新闻、公告、研报\n• 另类数据：卫星图像、社交媒体\n\n处理流程：\n• 数据清洗和标准化\n• 实体识别和关系抽取\n• 情感分析和事件检测\n• 知识图谱构建"
      },
      {
        section: "3. 智能分析模块",
        text: "智能投研系统的核心分析能力：\n\n财务分析：\n• 自动解读财报数据\n• 同业对比和趋势分析\n• 财务异常预警\n\n舆情分析：\n• 新闻情感评分\n• 热点事件追踪\n• 舆论趋势预测\n\n估值模型：\n• DCF模型自动化\n• 相对估值比较\n• 敏感性分析"
      },
      {
        section: "4. 研报自动生成",
        text: "利用LLM实现研报的自动生成。\n\n生成流程：\n1. 数据收集：汇总相关数据和信息\n2. 分析整合：AI分析并提炼要点\n3. 模板填充：按照研报结构组织内容\n4. 人工审核：专业人员校验和润色\n\n应用场景：\n• 晨会简报自动生成\n• 定期研报批量产出\n• 实时事件快评"
      }
    ],
    keyPoints: [
      "智能投研整合多源数据提升研究效率",
      "NLP技术是处理非结构化信息的关键",
      "知识图谱帮助发现隐藏关联",
      "人机协作是当前最佳实践模式"
    ]
  },
  "smart-risk": {
    title: "智能风控体系",
    category: "金融科技应用",
    level: "核心",
    duration: "45分钟",
    description: "金融风险管理中的AI技术应用与实践",
    objectives: [
      "理解智能风控的核心框架和方法",
      "掌握信用评分和反欺诈的AI应用",
      "学会构建实时风险监控系统",
      "了解风控模型的可解释性要求"
    ],
    content: [
      {
        section: "1. 智能风控概述",
        text: "智能风控利用AI技术提升风险识别、评估和管理能力。\n\n风控类型：\n• 信用风险：违约概率评估\n• 市场风险：价格波动管理\n• 操作风险：内部流程监控\n• 欺诈风险：异常行为检测\n\nAI优势：\n• 处理高维度特征\n• 实时风险评估\n• 发现复杂模式\n• 持续学习优化"
      },
      {
        section: "2. 智能信用评分",
        text: "AI重塑信用评估方法，提升预测准确性。\n\n传统方法局限：\n• 特征有限，覆盖不足\n• 规则固定，适应性差\n• 人工审核，效率低下\n\nAI解决方案：\n• 多维特征工程\n• 机器学习模型\n• 实时评分更新\n• 可解释性报告",
        code: `# 信用评分模型示例
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
import shap

# 准备数据
X = df[['income', 'debt_ratio', 'credit_history', 
        'employment_years', 'loan_amount']]
y = df['default']

# 训练模型
X_train, X_test, y_train, y_test = train_test_split(X, y)
model = GradientBoostingClassifier()
model.fit(X_train, y_train)

# 模型解释
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 单个预测解释
shap.force_plot(explainer.expected_value, 
                shap_values[0], X_test.iloc[0])`
      },
      {
        section: "3. 反欺诈系统",
        text: "AI驱动的反欺诈系统实现实时检测和预防。\n\n检测方法：\n• 规则引擎：基于专家经验\n• 异常检测：统计学方法\n• 机器学习：监督/无监督学习\n• 图分析：关系网络挖掘\n\n应用场景：\n• 信用卡盗刷检测\n• 账户异常登录\n• 虚假交易识别\n• 身份冒用防范"
      },
      {
        section: "4. 实时风险监控",
        text: "构建全方位实时风险监控体系。\n\n监控维度：\n• 交易监控：异常交易实时告警\n• 头寸监控：风险敞口动态追踪\n• 舆情监控：负面信息即时预警\n• 合规监控：违规行为自动检测\n\n技术架构：\n• 流式计算处理实时数据\n• 复杂事件处理引擎\n• 可视化监控大屏\n• 自动化响应机制"
      }
    ],
    keyPoints: [
      "智能风控实现从被动防御到主动预警",
      "机器学习提升信用评分准确性",
      "实时监控需要流式计算架构支持",
      "模型可解释性是监管合规的要求"
    ]
  },
  "regtech": {
    title: "RegTech监管科技",
    category: "金融科技应用",
    level: "进阶",
    duration: "35分钟",
    description: "合规科技的发展趋势和AI应用场景",
    objectives: [
      "理解RegTech的概念和发展背景",
      "掌握AI在合规领域的应用场景",
      "学会构建自动化合规系统",
      "了解监管科技的未来趋势"
    ],
    content: [
      {
        section: "1. RegTech概述",
        text: "RegTech(监管科技)运用新技术帮助金融机构更高效地满足合规要求。\n\n发展背景：\n• 监管要求日益复杂\n• 合规成本持续上升\n• 人工合规效率低下\n• 技术创新提供可能\n\n核心价值：\n• 降低合规成本\n• 提升合规效率\n• 减少人为错误\n• 实现主动合规"
      },
      {
        section: "2. 反洗钱(AML)应用",
        text: "AI革新反洗钱工作流程。\n\n传统挑战：\n• 规则产生大量误报\n• 人工审核效率低\n• 新型洗钱手法层出不穷\n\nAI解决方案：\n• 智能客户识别(KYC)\n• 交易监控优化\n• 可疑活动报告自动化\n• 关系网络分析",
        code: `# 反洗钱交易监控示例
import networkx as nx
import pandas as pd

def build_transaction_network(transactions):
    """构建交易网络图"""
    G = nx.DiGraph()
    
    for _, tx in transactions.iterrows():
        G.add_edge(
            tx['sender'], 
            tx['receiver'],
            amount=tx['amount'],
            timestamp=tx['timestamp']
        )
    
    return G

def detect_suspicious_patterns(G):
    """检测可疑模式"""
    suspicious = []
    
    # 检测循环交易
    cycles = list(nx.simple_cycles(G))
    suspicious.extend(cycles)
    
    # 检测分散聚合模式
    for node in G.nodes():
        in_degree = G.in_degree(node)
        out_degree = G.out_degree(node)
        if in_degree > 10 and out_degree == 1:
            suspicious.append(('aggregation', node))
    
    return suspicious`
      },
      {
        section: "3. 合规报告自动化",
        text: "利用AI实现合规报告的自动生成。\n\n应用场景：\n• 监管报表自动填报\n• 交易报告自动生成\n• 风险评估报告\n• 审计trail记录\n\n技术实现：\n• 数据自动抽取和汇总\n• 报告模板智能填充\n• 数据一致性校验\n• 提交前合规检查"
      },
      {
        section: "4. 政策变化监控",
        text: "AI助力监管政策的实时追踪和影响分析。\n\n核心功能：\n• 监管动态实时抓取\n• 政策变化智能解读\n• 影响范围自动评估\n• 合规建议自动生成\n\n实施要点：\n• 构建监管知识库\n• NLP提取政策要点\n• 映射业务影响\n• 跟踪执行进度"
      }
    ],
    keyPoints: [
      "RegTech帮助金融机构降本增效",
      "AI显著减少反洗钱误报率",
      "合规自动化是发展趋势",
      "政策变化监控需要NLP技术支持"
    ]
  },
  "smart-wealth": {
    title: "智能财富管理",
    category: "金融科技应用",
    level: "核心",
    duration: "40分钟",
    description: "智能投顾和个性化资产配置的实现路径",
    objectives: [
      "理解智能财富管理的核心概念",
      "掌握智能投顾的技术实现",
      "学会设计个性化资产配置算法",
      "了解智能理财的合规要求"
    ],
    content: [
      {
        section: "1. 智能财富管理概述",
        text: "智能财富管理利用AI技术为大众提供专业级理财服务。\n\n市场背景：\n• 财富管理需求旺盛\n• 传统服务门槛高\n• 个性化需求强烈\n• 技术成熟度提升\n\n核心价值：\n• 降低服务门槛\n• 提升个性化水平\n• 7x24小时服务\n• 降低管理费用"
      },
      {
        section: "2. 智能投顾系统",
        text: "智能投顾(Robo-Advisor)是智能财富管理的核心应用。\n\n系统架构：\n• 用户画像模块：风险偏好、投资目标\n• 资产配置引擎：组合优化算法\n• 交易执行系统：自动化调仓\n• 监控报告模块：收益跟踪和报告\n\n关键技术：\n• 风险评估问卷设计\n• 现代投资组合理论\n• 再平衡策略\n• 税务优化"
      },
      {
        section: "3. 个性化资产配置",
        text: "基于用户画像的个性化资产配置。\n\n用户画像维度：\n• 风险承受能力\n• 投资期限\n• 流动性需求\n• 投资经验\n• 财务目标\n\n配置方法：\n• 战略配置：长期目标配置\n• 战术配置：短期调整优化\n• 动态再平衡：定期/阈值触发",
        code: `# 均值-方差优化示例
import numpy as np
from scipy.optimize import minimize

def portfolio_optimization(returns, cov_matrix, risk_tolerance):
    """
    基于均值-方差优化的资产配置
    """
    n_assets = len(returns)
    
    def objective(weights):
        portfolio_return = np.dot(weights, returns)
        portfolio_risk = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        # 效用函数：收益 - 风险厌恶系数 * 风险
        return -(portfolio_return - risk_tolerance * portfolio_risk)
    
    # 约束条件
    constraints = [
        {'type': 'eq', 'fun': lambda w: np.sum(w) - 1}  # 权重和为1
    ]
    bounds = [(0, 1) for _ in range(n_assets)]  # 权重在0-1之间
    
    # 优化
    initial_weights = np.array([1/n_assets] * n_assets)
    result = minimize(objective, initial_weights, 
                     method='SLSQP', bounds=bounds, constraints=constraints)
    
    return result.x

# 使用示例
expected_returns = np.array([0.08, 0.12, 0.06, 0.10])
cov_matrix = np.array([
    [0.04, 0.02, 0.01, 0.02],
    [0.02, 0.09, 0.02, 0.03],
    [0.01, 0.02, 0.01, 0.01],
    [0.02, 0.03, 0.01, 0.04]
])

optimal_weights = portfolio_optimization(expected_returns, cov_matrix, 0.5)
print("最优配置:", optimal_weights)`
      },
      {
        section: "4. 智能理财对话",
        text: "基于LLM的智能理财助手。\n\n应用场景：\n• 投资咨询问答\n• 产品推荐解释\n• 市场观点解读\n• 账户状态查询\n\n设计要点：\n• 专业知识准确性\n• 合规话术约束\n• 个性化推荐\n• 风险提示完整"
      }
    ],
    keyPoints: [
      "智能投顾降低财富管理服务门槛",
      "个性化配置需要精准用户画像",
      "组合优化算法是核心技术",
      "合规风险提示不可忽视"
    ]
  }
};

const levelColors = {
  "基础": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "进阶": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "核心": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
};

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const course = courseId ? coursesData[courseId] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">课程未找到</h1>
          <Button onClick={() => navigate("/learning/knowledge")}>
            返回知识中心
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/learning/knowledge")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回知识中心
          </Button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={levelColors[course.level as keyof typeof levelColors]}>
                {course.level}
              </Badge>
              <span className="text-sm text-muted-foreground">{course.category}</span>
              <span className="text-sm text-muted-foreground">• {course.duration}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Learning Objectives */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>学习目标</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {course.objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Course Content */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">课程内容</h2>
          </div>

          {course.content.map((section: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{section.section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.text}
                </p>
                
                {section.code && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Code className="w-4 h-4 text-primary" />
                      <span>代码示例</span>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">{section.code}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Points */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>核心要点</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {course.keyPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/learning/knowledge")}
          >
            返回课程列表
          </Button>
          <Button onClick={() => navigate("/learning/practice")}>
            前往练习
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;