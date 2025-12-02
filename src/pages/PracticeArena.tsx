import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Dumbbell,
  Code2,
  Zap,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Exercise {
  title: string;
  duration: string;
  difficulty: string;
  description: string;
  skills: string[];
  detailedContent: string;
  codeExample: string;
  expectedResult: string;
}

const practiceModules = [
  {
    category: "基础技能",
    color: "from-green-500 to-emerald-500",
    exercises: [
      {
        title: "LLM API调用练习",
        duration: "30分钟",
        difficulty: "入门",
        description: "学习如何通过Python调用主流大模型API",
        skills: ["Python", "API调用", "错误处理"],
        detailedContent: `本练习将教你如何使用Python调用OpenAI、Anthropic等主流大模型API。你将学习：

1. **环境准备**：安装必要的Python库（openai、anthropic等）
2. **API密钥配置**：安全地管理和使用API密钥
3. **基础调用**：发送请求并获取模型响应
4. **参数控制**：调整temperature、max_tokens等参数
5. **错误处理**：处理网络错误、API限流等异常情况`,
        codeExample: `import openai
import os

# 配置API密钥
openai.api_key = os.getenv("OPENAI_API_KEY")

def call_llm(prompt, model="gpt-4"):
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "你是一个有帮助的AI助手"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        return response.choices[0].message.content
    except openai.error.RateLimitError:
        return "API调用频率超限，请稍后重试"
    except Exception as e:
        return f"发生错误：{str(e)}"

# 测试调用
result = call_llm("解释什么是大语言模型")
print(result)`,
        expectedResult: `大语言模型（Large Language Model, LLM）是一种基于深度学习的人工智能模型，通过在海量文本数据上进行训练，能够理解和生成自然语言。这些模型通常具有数十亿甚至上千亿个参数，可以完成文本生成、问答、翻译、摘要等多种语言任务。

常见的大语言模型包括：
- GPT系列（OpenAI）
- Claude（Anthropic）
- PaLM（Google）
- LLaMA（Meta）

成功输出表明API调用正常工作！`,
      },
      {
        title: "Prompt设计实战",
        duration: "45分钟",
        difficulty: "基础",
        description: "练习设计高质量的Prompt以获得更好的输出",
        skills: ["提示词工程", "输出控制", "Few-shot学习"],
        detailedContent: `本练习将教你如何设计高质量的Prompt来获得更好的AI输出。关键技巧包括：

1. **明确指令**：清晰描述你想要的结果
2. **提供上下文**：给出必要的背景信息
3. **Few-shot学习**：提供示例来引导输出格式
4. **角色设定**：为AI设定特定角色以获得专业回答
5. **输出格式控制**：指定JSON、Markdown等输出格式`,
        codeExample: `# 不好的Prompt示例
prompt_bad = "写一篇文章"

# 好的Prompt示例
prompt_good = """
你是一位经验丰富的技术博客作者。请写一篇关于"什么是RAG技术"的文章。

要求：
1. 字数500-800字
2. 包含以下部分：定义、工作原理、应用场景、优势
3. 使用Markdown格式
4. 语言通俗易懂，适合技术初学者

示例结构：
# 标题
## 什么是RAG
[内容]
## 工作原理
[内容]
## 应用场景
[内容]
"""

# Few-shot学习示例
prompt_fewshot = """
将以下文本分类为：正面、负面、中性

示例1：
文本："这个产品太棒了！"
分类：正面

示例2：
文本："质量一般般"
分类：中性

现在请分类：
文本："非常失望，完全不值这个价格"
分类：
"""`,
        expectedResult: `使用优化后的Prompt，你应该能获得：

1. **结构化输出**：符合要求的Markdown格式文章
2. **内容完整**：包含所有指定的章节
3. **语言风格**：适合目标读者的表达方式
4. **准确分类**：Few-shot示例应返回"负面"

关键要点：
✓ Prompt越具体，输出越精准
✓ 提供示例可大幅提升输出质量
✓ 明确输出格式便于后续处理`,
      },
    ],
  },
  {
    category: "LangChain框架",
    color: "from-blue-500 to-cyan-500",
    exercises: [
      {
        title: "文档加载器实战",
        duration: "40分钟",
        difficulty: "基础",
        description: "使用PyPDFLoader、WebBaseLoader等加载不同数据源",
        skills: ["文档解析", "数据加载", "格式转换"],
        detailedContent: `学习使用LangChain的文档加载器从各种数据源加载内容：

1. **PDF文档**：使用PyPDFLoader解析PDF文件
2. **网页内容**：使用WebBaseLoader爬取网页
3. **文本文件**：使用TextLoader加载普通文本
4. **CSV数据**：使用CSVLoader处理结构化数据`,
        codeExample: `from langchain_community.document_loaders import (
    PyPDFLoader,
    WebBaseLoader,
    TextLoader,
    CSVLoader
)

# 1. 加载PDF文档
pdf_loader = PyPDFLoader("research_paper.pdf")
pdf_docs = pdf_loader.load()
print(f"加载了 {len(pdf_docs)} 页PDF")

# 2. 加载网页内容
web_loader = WebBaseLoader("https://example.com/article")
web_docs = web_loader.load()
print(f"网页内容长度：{len(web_docs[0].page_content)} 字符")

# 3. 加载文本文件
text_loader = TextLoader("data.txt", encoding="utf-8")
text_docs = text_loader.load()

# 4. 加载CSV
csv_loader = CSVLoader("customers.csv")
csv_docs = csv_loader.load()

# 所有文档都转换为统一的Document格式
for doc in pdf_docs[:1]:
    print(f"内容预览：{doc.page_content[:200]}")
    print(f"元数据：{doc.metadata}")`,
        expectedResult: `成功执行后你将看到：

加载了 15 页PDF
网页内容长度：3542 字符
内容预览：Introduction to Large Language Models...
元数据：{'source': 'research_paper.pdf', 'page': 0}

关键收获：
✓ 不同数据源统一为Document对象
✓ 每个Document包含page_content和metadata
✓ 可以批量处理多个文档`,
      },
      {
        title: "文本分割与向量化",
        duration: "50分钟",
        difficulty: "进阶",
        description: "掌握文本切分策略和向量嵌入技术",
        skills: ["Text Splitting", "Embeddings", "向量存储"],
        detailedContent: `将长文本切分成小块并转换为向量，这是RAG系统的核心步骤：

1. **文本分割**：使用RecursiveCharacterTextSplitter
2. **向量嵌入**：使用OpenAIEmbeddings生成向量
3. **向量存储**：使用Chroma/FAISS存储和检索
4. **相似度搜索**：找到最相关的文档块`,
        codeExample: `from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. 文本分割
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,        # 每块500字符
    chunk_overlap=50,      # 块之间重叠50字符
    separators=["\\n\\n", "\\n", "。", "，", " "]
)

long_text = """
[你的长文本内容...]
"""

chunks = text_splitter.split_text(long_text)
print(f"分割成 {len(chunks)} 个文本块")

# 2. 创建向量嵌入
embeddings = OpenAIEmbeddings()

# 3. 存储到向量数据库
vectorstore = Chroma.from_texts(
    texts=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# 4. 相似度搜索
query = "什么是RAG技术？"
results = vectorstore.similarity_search(query, k=3)

for i, doc in enumerate(results):
    print(f"\\n结果 {i+1}:")
    print(doc.page_content[:200])`,
        expectedResult: `执行结果示例：

分割成 23 个文本块

结果 1:
RAG（Retrieval-Augmented Generation）是一种结合了检索和生成的AI技术...

结果 2:
RAG系统的工作流程包括：1. 文档加载 2. 文本分割 3. 向量化...

结果 3:
向量数据库可以高效地找到与查询最相关的文档片段...

验证要点：
✓ 文本被合理分割，保持语义完整性
✓ 向量搜索返回最相关的内容
✓ chunk_overlap确保上下文不丢失`,
      },
      {
        title: "构建检索链",
        duration: "60分钟",
        difficulty: "进阶",
        description: "实现完整的RAG检索增强生成链路",
        skills: ["Retrieval Chain", "向量检索", "生成优化"],
        detailedContent: `构建一个完整的RAG（检索增强生成）系统：

1. **检索器配置**：设置向量数据库检索器
2. **Prompt模板**：设计包含检索内容的提示词
3. **检索链组装**：将检索和生成串联
4. **结果优化**：处理和格式化最终输出`,
        codeExample: `from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# 假设vectorstore已创建（参考上一练习）

# 1. 创建检索器
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}  # 检索前3个最相关结果
)

# 2. 定义Prompt模板
template = """
使用以下上下文来回答问题。如果你不知道答案，就说不知道，不要试图编造。

上下文：
{context}

问题：{question}

详细回答：
"""

prompt = PromptTemplate(
    template=template,
    input_variables=["context", "question"]
)

# 3. 创建检索问答链
llm = ChatOpenAI(model="gpt-4", temperature=0)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True
)

# 4. 执行查询
query = "RAG系统如何工作？"
result = qa_chain({"query": query})

print("答案：", result["result"])
print("\\n来源文档数量：", len(result["source_documents"]))`,
        expectedResult: `执行结果：

答案： RAG系统的工作流程如下：
1. 用户提出问题
2. 系统将问题转换为向量
3. 在向量数据库中检索最相关的文档片段
4. 将检索到的内容作为上下文，与问题一起发送给大模型
5. 大模型基于检索到的真实内容生成准确回答

来源文档数量： 3

关键优势：
✓ 基于实际文档内容回答，减少幻觉
✓ 可追溯信息来源
✓ 实时更新知识库无需重新训练模型`,
      },
    ],
  },
  {
    category: "AI Agent开发",
    color: "from-purple-500 to-pink-500",
    exercises: [
      {
        title: "Agent角色定义",
        duration: "35分钟",
        difficulty: "进阶",
        description: "使用crewAI定义Agent的角色、目标和工具",
        skills: ["crewAI", "角色设计", "工具配置"],
        detailedContent: `学习使用crewAI框架创建具有特定角色和能力的AI Agent：

1. **角色定义**：设定Agent的身份和专长
2. **目标设定**：明确Agent的工作目标
3. **工具配置**：为Agent配备必要的工具
4. **背景故事**：增强Agent的个性化`,
        codeExample: `from crewai import Agent
from crewai_tools import SerperDevTool, WebsiteSearchTool

# 创建搜索工具
search_tool = SerperDevTool()
web_tool = WebsiteSearchTool()

# 定义研究员Agent
researcher = Agent(
    role="AI技术研究员",
    goal="深入研究和分析最新的AI技术趋势",
    backstory="""
    你是一位经验丰富的AI研究员，专注于大语言模型和AI Agent技术。
    你擅长从海量信息中提取关键洞察，并用通俗易懂的语言解释复杂概念。
    """,
    tools=[search_tool, web_tool],
    verbose=True,
    allow_delegation=False
)

# 定义内容作家Agent  
writer = Agent(
    role="技术内容作家",
    goal="将技术研究转化为高质量的博客文章",
    backstory="""
    你是一位技术作家，擅长将复杂的技术概念转化为引人入胜的文章。
    你的文章既专业又易读，深受技术社区喜爱。
    """,
    tools=[],
    verbose=True,
    allow_delegation=False
)

print("Agent创建成功！")
print(f"研究员：{researcher.role}")
print(f"作家：{writer.role}")`,
        expectedResult: `输出结果：

Agent创建成功！
研究员：AI技术研究员
作家：技术内容作家

理解要点：
✓ 每个Agent有明确的角色和目标
✓ backstory让Agent更有个性
✓ tools决定Agent的能力范围
✓ allow_delegation控制是否可委托任务给其他Agent`,
      },
      {
        title: "多Agent协作",
        duration: "70分钟",
        difficulty: "高级",
        description: "编排多个Agent协同工作完成复杂任务",
        skills: ["协作模式", "任务编排", "通信机制"],
        detailedContent: `创建多个Agent协同工作的系统，完成复杂的多步骤任务：

1. **定义任务**：为每个Agent分配具体任务
2. **设置依赖**：建立任务之间的执行顺序
3. **创建Crew**：组装Agent团队
4. **执行流程**：运行协作流程并获取结果`,
        codeExample: `from crewai import Agent, Task, Crew, Process

# 假设researcher和writer已定义（参考上一练习）

# 1. 定义研究任务
research_task = Task(
    description="""
    研究2024年AI Agent的最新发展趋势。
    重点关注：技术突破、应用案例、未来方向。
    提供详细的研究报告，包含数据和案例支持。
    """,
    agent=researcher,
    expected_output="一份包含最新AI Agent趋势的详细研究报告"
)

# 2. 定义写作任务（依赖研究结果）
writing_task = Task(
    description="""
    基于研究报告，撰写一篇关于AI Agent发展趋势的博客文章。
    要求：
    - 标题吸引人
    - 结构清晰（引言、主体、结论）
    - 包含具体案例
    - 字数800-1200字
    """,
    agent=writer,
    expected_output="一篇高质量的博客文章，格式为Markdown"
)

# 3. 创建Crew（团队）
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,  # 顺序执行
    verbose=True
)

# 4. 启动协作流程
result = crew.kickoff()

print("\\n=== 最终输出 ===")
print(result)`,
        expectedResult: `执行过程输出：

[研究员] 开始研究AI Agent趋势...
[研究员] 已完成研究，生成报告

[作家] 基于研究报告撰写文章...  
[作家] 文章撰写完成

=== 最终输出 ===
# AI Agent的革命性突破：2024年度观察

## 引言
2024年，AI Agent技术经历了前所未有的发展...

[完整博客文章内容]

关键收获：
✓ 多个Agent按顺序协作
✓ 后续任务自动使用前置任务的输出
✓ Process.sequential确保执行顺序
✓ 整个流程自动化，无需人工干预`,
      },
    ],
  },
  {
    category: "高级技能",
    color: "from-orange-500 to-red-500",
    exercises: [
      {
        title: "多模态处理（Whisper）",
        duration: "45分钟",
        difficulty: "高级",
        description: "使用Whisper模型进行语音识别和转录",
        skills: ["语音识别", "音频处理", "Whisper API"],
        detailedContent: `学习使用OpenAI的Whisper模型进行语音识别和转录：

1. **音频文件处理**：支持多种音频格式
2. **语音转文本**：高精度转录
3. **多语言支持**：自动语言检测
4. **时间戳提取**：获取字幕级别的时间信息`,
        codeExample: `import openai
from pathlib import Path

# 1. 基础语音转文本
def transcribe_audio(audio_file_path):
    """将音频转录为文本"""
    with open(audio_file_path, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file,
            language="zh"  # 指定中文，也可留空自动检测
        )
    return transcript.text

# 2. 带时间戳的转录
def transcribe_with_timestamps(audio_file_path):
    """获取带时间戳的转录结果"""
    with open(audio_file_path, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file,
            response_format="verbose_json",
            timestamp_granularities=["segment"]
        )
    
    # 打印每个片段的时间戳
    for segment in transcript.segments:
        start = segment.start
        end = segment.end
        text = segment.text
        print(f"[{start:.2f}s - {end:.2f}s] {text}")
    
    return transcript

# 3. 翻译功能（将其他语言翻译成英文）
def translate_audio(audio_file_path):
    """将音频翻译为英文"""
    with open(audio_file_path, "rb") as audio_file:
        translation = openai.Audio.translate(
            model="whisper-1",
            file=audio_file
        )
    return translation.text

# 使用示例
audio_path = "meeting_recording.mp3"
text = transcribe_audio(audio_path)
print(f"转录结果：{text}")`,
        expectedResult: `执行结果示例：

转录结果：大家好，今天我们讨论一下AI Agent的最新进展。首先，让我们看看crewAI框架的核心概念...

带时间戳的输出：
[0.00s - 3.50s] 大家好，今天我们讨论一下AI Agent的最新进展。
[3.50s - 8.20s] 首先，让我们看看crewAI框架的核心概念。
[8.20s - 15.60s] crewAI允许我们创建多个智能Agent协同工作...

应用场景：
✓ 会议记录自动转录
✓ 播客/视频字幕生成
✓ 多语言内容本地化
✓ 语音助手开发`,
      },
      {
        title: "Web应用构建（Streamlit）",
        duration: "55分钟",
        difficulty: "进阶",
        description: "快速搭建AI应用的交互式前端界面",
        skills: ["Streamlit", "UI设计", "状态管理"],
        detailedContent: `使用Streamlit快速构建AI应用的Web界面：

1. **基础组件**：按钮、输入框、下拉菜单等
2. **布局设计**：列布局、侧边栏、标签页
3. **状态管理**：使用session_state保持状态
4. **数据展示**：图表、表格、Markdown渲染`,
        codeExample: `import streamlit as st
from openai import OpenAI

# 初始化OpenAI客户端
client = OpenAI()

# 设置页面配置
st.set_page_config(
    page_title="AI对话助手",
    page_icon="🤖",
    layout="wide"
)

# 页面标题
st.title("🤖 AI对话助手")
st.markdown("使用GPT-4构建的智能对话系统")

# 侧边栏配置
with st.sidebar:
    st.header("⚙️ 设置")
    model = st.selectbox(
        "选择模型",
        ["gpt-4", "gpt-3.5-turbo"]
    )
    temperature = st.slider(
        "创造性",
        min_value=0.0,
        max_value=2.0,
        value=0.7,
        step=0.1
    )

# 初始化聊天历史
if "messages" not in st.session_state:
    st.session_state.messages = []

# 显示聊天历史
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 聊天输入
if prompt := st.chat_input("输入你的问题..."):
    # 添加用户消息
    st.session_state.messages.append({
        "role": "user",
        "content": prompt
    })
    
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # 获取AI回复
    with st.chat_message("assistant"):
        response = client.chat.completions.create(
            model=model,
            messages=st.session_state.messages,
            temperature=temperature,
            stream=True
        )
        
        full_response = ""
        message_placeholder = st.empty()
        
        for chunk in response:
            if chunk.choices[0].delta.content:
                full_response += chunk.choices[0].delta.content
                message_placeholder.markdown(full_response + "▌")
        
        message_placeholder.markdown(full_response)
    
    # 保存AI回复
    st.session_state.messages.append({
        "role": "assistant",
        "content": full_response
    })

# 清除对话按钮
if st.button("🗑️ 清除对话"):
    st.session_state.messages = []
    st.rerun()`,
        expectedResult: `启动应用后（运行 streamlit run app.py），你将看到：

界面特点：
✓ 左侧边栏：模型选择和参数调整
✓ 主区域：聊天界面，支持流式输出
✓ 消息历史：自动保存对话记录
✓ 清除按钮：一键重置对话

交互流程：
1. 用户在输入框输入问题
2. 消息立即显示在界面
3. AI逐字输出回复（流式效果）
4. 对话历史保持在session中

关键优势：
✓ 纯Python开发，无需前端知识
✓ 组件丰富，快速搭建原型
✓ 自动处理状态管理
✓ 内置数据可视化能力`,
      },
    ],
  },
];

const difficultyColors = {
  入门: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  基础: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  进阶: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  高级: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const PracticeArena = () => {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const jupyterFormRef = useRef<HTMLFormElement | null>(null);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/learning")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回学习路径
          </Button>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-elegant flex-shrink-0">
              <Dumbbell className="w-10 h-10 text-white" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary/40">练</div>
                <h1 className="text-4xl md:text-5xl font-bold">技能训练场</h1>
              </div>

              <p className="text-xl text-muted-foreground max-w-3xl">
                通过原子化的编码练习，快速掌握关键技术栈和工具使用方法
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {practiceModules.map((module, index) => (
          <div key={index} className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}
              >
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">{module.category}</h2>
            </div>

            {/* Exercises Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.exercises.map((exercise, idx) => (
                <Card
                  key={idx}
                  className="group hover:scale-105 cursor-pointer h-full flex flex-col"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        className={
                          difficultyColors[
                            exercise.difficulty as keyof typeof difficultyColors
                          ]
                        }
                      >
                        {exercise.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>
                    </div>

                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {exercise.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {exercise.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3 mb-4">
                      <div className="text-xs font-semibold text-muted-foreground">
                        技能点：
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exercise.skills.map((skill, skillIdx) => (
                          <Badge
                            key={skillIdx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      开始练习
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Practice Tips */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">训练建议</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    每个练习都是独立的，可以根据自己的薄弱环节选择性练习
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>建议在知识学习中心学习相关理论后再进行对应练习</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    熟练掌握这些技能后，可前往"项目实战坊"进行综合应用
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exercise Detail Dialog */}
      <Dialog
        open={!!selectedExercise}
        onOpenChange={() => setSelectedExercise(null)}
      >
        <DialogContent className="max-w-4xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedExercise?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-4 pt-2">
              <Badge
                className={
                  difficultyColors[
                    selectedExercise?.difficulty as keyof typeof difficultyColors
                  ]
                }
              >
                {selectedExercise?.difficulty}
              </Badge>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedExercise?.duration}
              </span>
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {/* 练习说明 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">📝 练习说明</h3>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {selectedExercise?.detailedContent}
                </div>
              </div>

              {/* 技能点 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">🎯 技能点</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise?.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 代码示例 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">💻 代码示例</h3>
                <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code>{selectedExercise?.codeExample}</code>
                  </pre>
                </div>
              </div>

              {/* 预期结果 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  预期结果
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="text-sm whitespace-pre-line leading-relaxed">
                    {selectedExercise?.expectedResult}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <form
            ref={jupyterFormRef}
            action="http://116.204.67.82:8000//hub/login?next=/hub/"
            method="post"
            target="_blank"
            style={{ display: "none" }}
          >
            <input type="text" name="username" defaultValue={"stat"} />
            <input type="text" name="password" defaultValue="" />
          </form>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setSelectedExercise(null)}
            >
              关闭
            </Button>
            <Button
              className="flex-1"
              onClick={() => jupyterFormRef.current?.submit()}
            >
              <Zap className="w-4 h-4 mr-2" />
              开始练习
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PracticeArena;
