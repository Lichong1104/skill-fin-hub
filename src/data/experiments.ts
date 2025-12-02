import { 
  MessageSquare, 
  Shield, 
  FileCheck, 
  Database, 
  Bot, 
  Mic,
  LucideIcon
} from "lucide-react";

export interface Experiment {
  id: string;
  icon: LucideIcon;
  title: string;
  level: string;
  duration: string;
  description: string;
  skills: string[];
  color: string;
  detailedDescription: string;
  businessBackground: string;
  learningObjectives: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  steps: {
    title: string;
    description: string;
    tasks: string[];
  }[];
  codeExamples: {
    title: string;
    description: string;
    language: string;
    code: string;
  }[];
}

export const experiments: Experiment[] = [
  {
    id: "prompt-engineering",
    icon: MessageSquare,
    title: "金融提示词工程",
    level: "基础",
    duration: "2-3小时",
    description: "掌握系统化、结构化的Prompt编写方法，精准控制大模型输出",
    skills: ["角色扮演", "少样本学习", "思维链推理", "JSON格式化"],
    color: "from-blue-500 to-cyan-500",
    detailedDescription: "在金融分析中，向AI提问的质量直接决定了答案的准确性。一个优秀的Prompt能将AI的效能提升数倍。本实验将系统性地训练您掌握Prompt Engineering的核心技术，让您能够精准控制大语言模型的输出，使其成为您的专业助手。",
    businessBackground: "金融机构每天需要处理大量的文本分析工作，包括财报解读、新闻情感分析、风险评估等。传统方法效率低下，而通过精心设计的Prompt，可以让AI高效完成这些任务，大幅提升工作效率和准确性。",
    learningObjectives: [
      "理解结构化Prompt的构成要素（角色、任务、格式、约束）",
      "掌握零样本学习和少样本学习的应用场景",
      "学会使用思维链（Chain of Thought）技术引导模型逻辑推理",
      "能够设计Prompt实现JSON等结构化数据输出",
      "培养针对金融场景优化Prompt的能力"
    ],
    techStack: [
      {
        category: "核心技术",
        items: ["大语言模型API调用", "Prompt Engineering方法论", "输出格式控制"]
      },
      {
        category: "开发工具",
        items: ["Python", "OpenAI API / 本地开源模型", "Jupyter Notebook"]
      }
    ],
    steps: [
      {
        title: "角色扮演实验",
        description: "学习如何通过角色设定让LLM产生专业输出",
        tasks: [
          "编写Prompt让模型扮演资深券商分析师",
          "要求模型以专业术语解读某公司季度财报",
          "对比有无角色设定时的输出差异",
          "优化Prompt使输出更加专业和结构化"
        ]
      },
      {
        title: "少样本学习",
        description: "通过示例引导模型学习特定任务模式",
        tasks: [
          "准备2-3个金融新闻情感分类的标注样本",
          "在Prompt中提供这些样本作为学习示例",
          "测试模型对新新闻的分类准确性",
          "调整样本数量和质量，观察效果变化"
        ]
      },
      {
        title: "思维链推理",
        description: "引导模型展示推理过程，提高复杂计算准确性",
        tasks: [
          "设计计算WACC（加权平均资本成本）的任务",
          "要求模型逐步展示计算过程",
          "验证每一步的正确性",
          "对比思维链与直接输出结果的准确度差异"
        ]
      },
      {
        title: "结构化信息抽取",
        description: "强制模型以JSON格式输出，便于后续处理",
        tasks: [
          "设计JSON输出模板（公司名称、事件类型、影响等字段）",
          "从公司公告中抽取关键信息",
          "编写代码解析JSON输出并进行数据验证",
          "处理模型输出格式不规范的边界情况"
        ]
      }
    ],
    codeExamples: [
      {
        title: "角色扮演Prompt示例",
        description: "通过设定专业角色提升模型输出质量",
        language: "python",
        code: `import openai

# 基础版本 - 没有角色设定
prompt_basic = "分析一下苹果公司2024Q1财报"

# 优化版本 - 加入角色扮演
prompt_advanced = """
你是一位拥有15年经验的资深投资分析师，专注于科技行业研究。

任务：请分析苹果公司2024Q1财报，重点关注：
1. 营收和利润增长情况
2. iPhone销售表现
3. 服务业务增长趋势
4. 毛利率变化及原因

要求：
- 使用专业的金融术语
- 提供量化分析（同比、环比增长率）
- 给出投资建议（买入/持有/卖出）

输出格式：
## 业绩概览
[内容]
## 分部分析
[内容]
## 投资建议
[内容]
"""

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt_advanced}]
)

print(response.choices[0].message.content)`
      },
      {
        title: "少样本学习实现",
        description: "通过提供示例让模型学习特定任务模式",
        language: "python",
        code: `import openai

# 少样本学习：金融新闻情感分类
prompt_fewshot = """
任务：判断以下金融新闻的情感倾向（正面/中性/负面）

示例1：
新闻：特斯拉Q3交付量超预期，股价盘后大涨8%
情感：正面

示例2：
新闻：美联储维持利率不变，符合市场预期
情感：中性

示例3：
新闻：某银行因违规被罚款5000万元
情感：负面

现在请分类以下新闻：
新闻：{news_text}
情感：
"""

def classify_news_sentiment(news):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{
            "role": "user", 
            "content": prompt_fewshot.format(news_text=news)
        }],
        temperature=0  # 降低随机性，保证一致性
    )
    return response.choices[0].message.content.strip()

# 测试
test_news = "腾讯发布新AI产品，市场反应热烈"
result = classify_news_sentiment(test_news)
print(f"情感分类结果：{result}")`
      },
      {
        title: "JSON格式输出",
        description: "强制模型输出结构化数据便于后续处理",
        language: "python",
        code: `import openai
import json

prompt_json = """
从以下公司公告中提取关键信息，以JSON格式输出：

公告内容：
"{announcement_text}"

要求JSON格式：
{{
  "company_name": "公司名称",
  "event_type": "事件类型（如：业绩预告、重大合同、高管变动等）",
  "announcement_date": "公告日期（YYYY-MM-DD）",
  "key_figures": {{
    "amount": "涉及金额（如有）",
    "percentage": "涨幅/跌幅（如有）"
  }},
  "impact_analysis": "对公司影响的简要分析（1-2句话）",
  "sentiment": "正面/中性/负面"
}}

请严格按照上述JSON格式输出，不要添加其他文字。
"""

def extract_announcement_info(text):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": prompt_json.format(announcement_text=text)
        }],
        temperature=0
    )
    
    # 解析JSON输出
    try:
        result = json.loads(response.choices[0].message.content)
        return result
    except json.JSONDecodeError:
        print("模型输出非标准JSON，尝试提取...")
        # 添加容错处理
        return None

# 示例使用
announcement = """
某科技公司发布公告：公司与某国际巨头签署战略合作协议，
合同金额预计达5亿元人民币，预计将在未来三年内为公司
带来显著营收增长。
"""

info = extract_announcement_info(announcement)
print(json.dumps(info, ensure_ascii=False, indent=2))`
      }
    ]
  },
  {
    id: "risk-control-agent",
    icon: Shield,
    title: "AI风险控制智能体",
    level: "进阶",
    duration: "4-5小时",
    description: "构建能自主监控、分析并报告金融风险的AI Agent系统",
    skills: ["AI Agent框架", "多Agent协作", "工具开发", "ReAct工作流"],
    color: "from-red-500 to-orange-500",
    detailedDescription: "金融市场风险瞬息万变，人工监控难以做到全面和及时。本实验将带您构建一个基于AI Agent的自动化风险监控系统，能够7x24小时监测市场舆情，自主分析潜在风险并生成预警报告。",
    businessBackground: "在现代金融风控体系中，及时发现和响应风险事件至关重要。传统的风控系统依赖规则引擎，难以应对新型风险。AI Agent能够自主感知环境、推理决策并采取行动，是新一代智能风控系统的核心。",
    learningObjectives: [
      "理解AI Agent的核心概念（感知-推理-行动循环）",
      "掌握crewAI框架构建多Agent协作系统",
      "学会为Agent开发和配置工具（Tools）",
      "理解ReAct（Reasoning + Acting）工作流原理",
      "能够设计Agent的角色、目标和协作流程"
    ],
    techStack: [
      {
        category: "核心框架",
        items: ["crewAI", "LangChain", "大语言模型API"]
      },
      {
        category: "工具开发",
        items: ["Python", "Web爬虫（BeautifulSoup/Scrapy）", "数据处理库"]
      },
      {
        category: "分析技术",
        items: ["自然语言处理", "情感分析", "风险识别算法"]
      }
    ],
    steps: [
      {
        title: "定义Agent角色",
        description: "创建专业化的AI智能体",
        tasks: [
          "创建市场信息研究员Agent（负责信息采集）",
          "创建金融风险分析师Agent（负责风险分析）",
          "定义每个Agent的角色描述、目标和背景故事",
          "配置Agent的工作参数（如创造性程度、详细程度等）"
        ]
      },
      {
        title: "开发工具集",
        description: "为Agent赋予操作能力",
        tasks: [
          "开发财经新闻爬取工具（目标网站：新浪财经/东方财富）",
          "开发文本预处理工具（清洗、分段）",
          "测试工具的稳定性和准确性",
          "将工具集成到研究员Agent中"
        ]
      },
      {
        title: "设计分析Prompt",
        description: "定义风险分析的核心逻辑",
        tasks: [
          "设计风险分类标准（信用风险、市场风险、操作风险等）",
          "编写风险评估Prompt模板",
          "定义输出报告的结构和格式",
          "测试并优化分析准确性"
        ]
      },
      {
        title: "编排工作流",
        description: "实现多Agent协作",
        tasks: [
          "设计任务传递机制（研究员→分析师）",
          "配置Agent之间的通信协议",
          "实现完整的监控-分析-报告流程",
          "添加异常处理和日志记录",
          "生成最终的结构化风险报告"
        ]
      }
    ],
    codeExamples: [
      {
        title: "创建AI Agent",
        description: "使用crewAI框架定义专业化Agent",
        language: "python",
        code: `from crewai import Agent
from crewai_tools import SerperDevTool, WebsiteSearchTool

# 初始化工具
search_tool = SerperDevTool()
web_tool = WebsiteSearchTool()

# 创建市场研究员Agent
researcher = Agent(
    role="金融市场研究员",
    goal="从各大财经网站收集和分析最新市场动态",
    backstory="""你是一位经验丰富的市场研究员，专注于金融风险监控。
    你擅长从海量新闻中快速识别潜在风险事件，并提取关键信息。""",
    tools=[search_tool, web_tool],
    verbose=True,
    allow_delegation=False
)

# 创建风险分析师Agent
analyst = Agent(
    role="风险分析专家",
    goal="评估市场事件的风险等级并生成预警报告",
    backstory="""你是一位资深的金融风险分析师，拥有10年以上经验。
    你能够准确判断市场事件对投资组合的潜在影响，并提出应对建议。""",
    tools=[],
    verbose=True,
    allow_delegation=False
)

print("✓ Agent创建成功！")
print(f"研究员：{researcher.role}")
print(f"分析师：{analyst.role}")`
      },
      {
        title: "多Agent协作工作流",
        description: "编排多个Agent完成复杂任务",
        language: "python",
        code: `from crewai import Agent, Task, Crew, Process

# 假设已创建researcher和analyst两个Agent

# 定义研究任务
research_task = Task(
    description="""
    监控今日（2024年11月5日）的金融市场新闻，重点关注：
    1. A股市场重大事件
    2. 上市公司公告
    3. 监管政策变化
    
    要求：
    - 收集至少5条重要新闻
    - 提取标题、时间、事件类型、涉及标的
    - 初步判断风险等级（高/中/低）
    """,
    agent=researcher,
    expected_output="一份包含5条以上新闻的结构化研究报告"
)

# 定义分析任务（依赖研究任务的输出）
analysis_task = Task(
    description="""
    基于研究员提供的市场新闻，进行深度风险分析：
    1. 对每条新闻进行详细的风险评估
    2. 分析可能的连锁反应和市场影响
    3. 提出风险应对建议
    4. 生成格式化的风险预警报告
    
    报告格式：
    # 市场风险日报
    ## 风险概览
    ## 重点事件分析
    ## 应对建议
    """,
    agent=analyst,
    expected_output="一份完整的风险预警报告（Markdown格式）"
)

# 创建Crew并执行
crew = Crew(
    agents=[researcher, analyst],
    tasks=[research_task, analysis_task],
    process=Process.sequential,  # 顺序执行
    verbose=True
)

# 启动工作流
result = crew.kickoff()

print("\\n" + "="*50)
print("风险监控任务完成！")
print("="*50)
print(result)`
      },
      {
        title: "自定义Agent工具",
        description: "为Agent开发专用的数据采集工具",
        language: "python",
        code: `from crewai import Agent
from crewai.tools import tool
import requests
from bs4 import BeautifulSoup

@tool("财经新闻爬虫")
def fetch_financial_news(query: str) -> str:
    """从东方财富网爬取相关财经新闻
    
    Args:
        query: 搜索关键词
    
    Returns:
        新闻列表的字符串表示
    """
    url = f"https://so.eastmoney.com/news/s?keyword={query}"
    
    try:
        response = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }, timeout=10)
        
        soup = BeautifulSoup(response.content, 'html.parser')
        news_items = soup.find_all('div', class_='news-item', limit=5)
        
        results = []
        for idx, item in enumerate(news_items, 1):
            title = item.find('h3').text.strip()
            time = item.find('span', class_='time').text.strip()
            summary = item.find('p').text.strip()[:100]
            
            results.append(f"{idx}. {title}\\n   时间：{time}\\n   摘要：{summary}...")
        
        return "\\n\\n".join(results)
    except Exception as e:
        return f"爬取失败：{str(e)}"

# 将工具分配给Agent
news_agent = Agent(
    role="财经新闻监控员",
    goal="实时监控指定关键词的新闻动态",
    backstory="专业的金融信息收集专员",
    tools=[fetch_financial_news],
    verbose=True
)

# 使用Agent
from crewai import Task
task = Task(
    description='获取关于"银行理财"的最新新闻',
    agent=news_agent,
    expected_output="5条最新相关新闻"
)

print(task.execute())`
      }
    ]
  },
  {
    id: "contract-audit",
    icon: FileCheck,
    title: "合同条款自动审核",
    level: "进阶",
    duration: "3-4小时",
    description: "构建自动读取PDF合同、抽取关键条款并比对的自动化流程",
    skills: ["PDF解析", "信息抽取", "规则引擎", "端到端工作流"],
    color: "from-purple-500 to-pink-500",
    detailedDescription: "金融机构每日需处理大量合同文档，人工审核不仅效率低下，还容易遗漏关键条款。本实验将构建一个自动化审核系统，能够智能解析PDF合同，精准抽取关键信息，并与合规标准进行比对，显著提升审核效率。",
    businessBackground: "在贷款、投资、保险等金融业务中，合同审核是关键风控环节。传统审核依赖人工逐字阅读，成本高且容易出错。利用LLM的信息抽取能力，可以实现合同审核的自动化和标准化。",
    learningObjectives: [
      "掌握PDF文档解析技术（文本提取、布局识别）",
      "学会使用LLM进行非结构化文本的信息抽取",
      "理解业务规则引擎的设计原理",
      "能够构建端到端的文档处理工作流",
      "培养合规审核的业务理解能力"
    ],
    techStack: [
      {
        category: "文档处理",
        items: ["PyMuPDF", "PDFPlumber", "正则表达式"]
      },
      {
        category: "信息抽取",
        items: ["大语言模型", "LangChain", "结构化输出"]
      },
      {
        category: "规则引擎",
        items: ["Python业务逻辑", "数据验证库（Pydantic）"]
      }
    ],
    steps: [
      {
        title: "PDF文档解析",
        description: "提取合同文本内容",
        tasks: [
          "使用PyMuPDF读取平台提供的金融合同PDF",
          "提取文本内容并保持格式结构",
          "处理多页文档和表格内容",
          "实现文本清洗和标准化"
        ]
      },
      {
        title: "关键条款抽取",
        description: "使用LLM智能识别重要信息",
        tasks: [
          "设计信息抽取Prompt（目标字段：金额、期限、利率、违约条款等）",
          "要求模型以JSON格式输出",
          "调用LLM进行信息抽取",
          "验证抽取结果的完整性和准确性"
        ]
      },
      {
        title: "合规规则比对",
        description: "将抽取结果与标准库进行对比",
        tasks: [
          "构建合规标准库（如：利率上限、最短期限等）",
          "编写比对逻辑代码",
          "标记出不符合规范的条款",
          "计算合规评分"
        ]
      },
      {
        title: "生成审核报告",
        description: "输出结构化的审核结果",
        tasks: [
          "设计审核报告模板",
          "汇总抽取结果和比对结果",
          "高亮显示风险项和异常条款",
          "生成可视化的审核报告（HTML/PDF）"
        ]
      }
    ],
    codeExamples: [
      {
        title: "PDF文本提取",
        description: "使用PyMuPDF解析合同文档",
        language: "python",
        code: `import fitz  # PyMuPDF
import re

def extract_contract_text(pdf_path):
    """从PDF合同中提取文本内容
    
    Args:
        pdf_path: PDF文件路径
    
    Returns:
        提取的文本内容
    """
    doc = fitz.open(pdf_path)
    full_text = ""
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        
        # 清洗文本：去除多余空格和换行
        text = re.sub(r'\\s+', ' ', text)
        text = text.strip()
        
        full_text += f"\\n===== 第{page_num + 1}页 =====\\n{text}\\n"
    
    doc.close()
    
    print(f"✓ 成功提取 {len(doc)} 页，共 {len(full_text)} 字符")
    return full_text

# 使用示例
contract_text = extract_contract_text("loan_contract.pdf")
print(contract_text[:500])  # 预览前500字符`
      },
      {
        title: "关键信息抽取",
        description: "使用LLM从合同中抽取结构化信息",
        language: "python",
        code: `import openai
import json

def extract_contract_terms(contract_text):
    """使用LLM抽取合同关键条款
    
    Args:
        contract_text: 合同文本内容
    
    Returns:
        包含关键信息的字典
    """
    
    prompt = f"""
你是一位专业的金融合同审核专家。请从以下合同文本中抽取关键信息，以JSON格式输出。

合同文本：
{contract_text[:3000]}  # 限制长度避免超token

要求输出JSON格式：
{{
  "contract_type": "合同类型（如：贷款合同、投资协议等）",
  "parties": {{
    "lender": "出借方名称",
    "borrower": "借款方名称"
  }},
  "financial_terms": {{
    "principal_amount": "本金金额（数字）",
    "interest_rate": "年利率（百分比）",
    "loan_term_months": "贷款期限（月）",
    "repayment_method": "还款方式"
  }},
  "key_dates": {{
    "signing_date": "签署日期（YYYY-MM-DD）",
    "effective_date": "生效日期（YYYY-MM-DD）",
    "maturity_date": "到期日期（YYYY-MM-DD）"
  }},
  "special_clauses": [
    "特殊条款列表（如：提前还款条款、违约条款等）"
  ],
  "collateral": "抵押物描述（如无则填null）"
}}

严格按照JSON格式输出，不要添加其他解释文字。
"""
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    
    # 解析JSON
    try:
        result = json.loads(response.choices[0].message.content)
        return result
    except json.JSONDecodeError as e:
        print(f"JSON解析失败：{e}")
        return None

# 使用示例
extracted_info = extract_contract_terms(contract_text)
print(json.dumps(extracted_info, ensure_ascii=False, indent=2))`
      },
      {
        title: "合规规则校验",
        description: "根据业务规则检查合同合规性",
        language: "python",
        code: `from typing import Dict, List
from pydantic import BaseModel, validator

class ComplianceRules(BaseModel):
    """合规规则定义"""
    max_interest_rate: float = 24.0  # 年利率上限(%)
    min_loan_term_months: int = 3    # 最短贷款期限(月)
    max_loan_term_months: int = 60   # 最长贷款期限(月)
    required_clauses: List[str] = [
        "违约责任",
        "争议解决",
        "提前还款"
    ]

class ContractAuditor:
    """合同审核器"""
    
    def __init__(self, rules: ComplianceRules):
        self.rules = rules
        self.violations = []
    
    def audit(self, contract_info: Dict) -> Dict:
        """执行合规审核
        
        Returns:
            审核结果字典
        """
        self.violations = []
        
        # 检查利率
        interest_rate = contract_info['financial_terms']['interest_rate']
        if float(interest_rate.rstrip('%')) > self.rules.max_interest_rate:
            self.violations.append({
                "type": "利率超标",
                "detail": f"年利率{interest_rate}超过上限{self.rules.max_interest_rate}%",
                "severity": "高"
            })
        
        # 检查期限
        term = contract_info['financial_terms']['loan_term_months']
        if term < self.rules.min_loan_term_months:
            self.violations.append({
                "type": "期限不合规",
                "detail": f"贷款期限{term}月，低于最短期限{self.rules.min_loan_term_months}月",
                "severity": "中"
            })
        
        # 检查必要条款
        special_clauses = contract_info.get('special_clauses', [])
        for required in self.rules.required_clauses:
            if not any(required in clause for clause in special_clauses):
                self.violations.append({
                    "type": "缺少必要条款",
                    "detail": f"未找到'{required}'相关条款",
                    "severity": "中"
                })
        
        # 生成审核结果
        is_compliant = len(self.violations) == 0
        compliance_score = max(0, 100 - len(self.violations) * 10)
        
        return {
            "is_compliant": is_compliant,
            "compliance_score": compliance_score,
            "violations": self.violations,
            "total_violations": len(self.violations)
        }

# 使用示例
rules = ComplianceRules()
auditor = ContractAuditor(rules)
audit_result = auditor.audit(extracted_info)

print("=== 审核结果 ===")
print(f"合规状态: {'✓ 通过' if audit_result['is_compliant'] else '✗ 不通过'}")
print(f"合规评分: {audit_result['compliance_score']}分")
print(f"发现问题: {audit_result['total_violations']}项")

for v in audit_result['violations']:
    print(f"\\n- [{v['severity']}] {v['type']}")
    print(f"  {v['detail']}")`
      }
    ]
  },
  {
    id: "rag-knowledge-base",
    icon: Database,
    title: "RAG智能知识库",
    level: "核心",
    duration: "5-6小时",
    description: "掌握企业级RAG技术，搭建基于私有数据的智能问答系统",
    skills: ["RAG技术栈", "向量数据库", "语义检索", "知识管理"],
    color: "from-green-500 to-emerald-500",
    detailedDescription: "大语言模型虽然强大，但缺乏企业私有知识。RAG（检索增强生成）技术能够让模型基于企业内部文档进行回答，是当前最主流的企业级AI应用架构。本实验将带您构建一个完整的RAG系统，实现智能研报问答。",
    businessBackground: "投资研究员需要快速从海量研报中获取精准信息，传统的关键词搜索无法理解语义，无法满足深度分析需求。RAG技术结合向量检索和大模型生成，能够准确理解问题意图并提供有据可查的答案。",
    learningObjectives: [
      "深入理解RAG技术的完整流程（索引、检索、生成）",
      "掌握文本向量化和语义相似度计算原理",
      "学会使用向量数据库（ChromaDB/FAISS）",
      "能够优化检索质量（chunk策略、top-k选择等）",
      "理解RAG系统的评估方法和优化方向"
    ],
    techStack: [
      {
        category: "核心框架",
        items: ["LangChain", "大语言模型API", "Embedding模型"]
      },
      {
        category: "向量数据库",
        items: ["ChromaDB", "FAISS", "向量相似度计算"]
      },
      {
        category: "文档处理",
        items: ["文档加载器（PyPDF, Markdown等）", "文本分割器", "元数据管理"]
      }
    ],
    steps: [
      {
        title: "文档处理与向量化",
        description: "构建知识库的数据基础",
        tasks: [
          "使用LangChain加载平台提供的宏观经济研报（PDF格式）",
          "使用RecursiveCharacterTextSplitter进行语义分割",
          "调用BGE等Embedding模型将文本转为向量",
          "存入ChromaDB向量数据库并创建索引"
        ]
      },
      {
        title: "语义检索实现",
        description: "根据问题检索相关文档片段",
        tasks: [
          "将用户问题转换为查询向量",
          "在向量数据库中进行相似度检索",
          "实现Top-K检索和相似度阈值过滤",
          "测试不同检索参数对结果的影响"
        ]
      },
      {
        title: "构建RAG链",
        description: "整合检索和生成流程",
        tasks: [
          "使用LangChain构建检索链（Retrieval Chain）",
          "设计系统Prompt（指导模型基于检索内容回答）",
          "实现完整的问答流程",
          "添加引用来源功能（显示答案来自哪份研报）"
        ]
      },
      {
        title: "系统测试与优化",
        description: "提升问答质量",
        tasks: [
          "准备测试问题集（如：近期CPI对货币政策的影响）",
          "评估答案的准确性和相关性",
          "优化chunk大小和overlap参数",
          "实现混合检索（关键词+向量）以提升召回率"
        ]
      }
    ],
    codeExamples: [
      {
        title: "文档加载与分割",
        description: "使用LangChain处理研报文档",
        language: "python",
        code: `from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# 1. 加载PDF研报
loader = PyPDFLoader("macro_economic_report_2024Q3.pdf")
documents = loader.load()

print(f"✓ 加载了 {len(documents)} 页文档")

# 2. 文本分割
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,          # 每个chunk约800字符
    chunk_overlap=100,       # chunk之间重叠100字符，保持上下文连贯
    separators=["\\n\\n", "\\n", "。", "；", " "],  # 优先按段落分割
    length_function=len,
)

chunks = text_splitter.split_documents(documents)

print(f"✓ 分割成 {len(chunks)} 个文本块")
print(f"\\n示例chunk内容：")
print(chunks[0].page_content[:200])
print(f"\\nchunk元数据：")
print(chunks[0].metadata)`
      },
      {
        title: "构建向量数据库",
        description: "将文档向量化并存储到ChromaDB",
        language: "python",
        code: `from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. 初始化Embedding模型
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",  # 或使用BGE等开源模型
    # model="BAAI/bge-large-zh-v1.5"  # 中文开源模型
)

# 2. 创建向量数据库
print("正在向量化文档并建立索引...")

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",  # 持久化存储路径
    collection_name="financial_reports"
)

print("✓ 向量数据库创建完成！")

# 3. 测试检索功能
query = "2024年第三季度GDP增长率是多少？"
print(f"\\n测试查询：{query}")

results = vectorstore.similarity_search(
    query, 
    k=3  # 返回最相关的3个chunk
)

print(f"\\n找到 {len(results)} 个相关文档片段：")
for i, doc in enumerate(results, 1):
    print(f"\\n--- 结果 {i} ---")
    print(doc.page_content[:150] + "...")
    print(f"来源：{doc.metadata}")`
      },
      {
        title: "完整RAG问答链",
        description: "构建端到端的检索增强生成系统",
        language: "python",
        code: `from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# 假设vectorstore已创建

# 1. 配置检索器
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={
        "k": 4,  # 检索top-4最相关的文档
    }
)

# 2. 定义System Prompt
template = """你是一位专业的金融研究分析师。请基于以下研报内容回答用户的问题。

重要规则：
1. 仅根据提供的研报内容回答，不要编造信息
2. 如果研报中没有相关信息，明确告知用户
3. 回答要专业、准确，引用具体数据时标注来源
4. 使用通俗易懂的语言解释专业术语

研报内容：
{context}

用户问题：{question}

专业回答："""

prompt = PromptTemplate(
    template=template,
    input_variables=["context", "question"]
)

# 3. 创建LLM
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0.3  # 较低温度保证回答稳定性
)

# 4. 构建RAG链
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # stuff模式：将所有检索到的文档拼接后发给LLM
    retriever=retriever,
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True  # 返回源文档
)

# 5. 执行问答
query = "报告对2025年经济走势的预测是什么？"
print(f"问题：{query}\\n")

result = qa_chain({"query": query})

print("回答：")
print(result["result"])
print(f"\\n参考来源：共引用 {len(result['source_documents'])} 份文档")
for i, doc in enumerate(result['source_documents'], 1):
    print(f"{i}. 页码：{doc.metadata.get('page', 'N/A')}")`
      }
    ]
  },
  {
    id: "wealth-advisor",
    icon: Bot,
    title: "智能财富管理顾问",
    level: "综合",
    duration: "4-5小时",
    description: "综合运用RAG和Web开发技术，打造专业的智能投顾聊天机器人",
    skills: ["对话式AI", "Streamlit", "系统提示词", "合规设计"],
    color: "from-indigo-500 to-blue-500",
    detailedDescription: "财富管理正从产品销售转向客户顾问服务，AI助手能够大幅提升服务效率和客户体验。本实验将结合RAG技术和前端开发，构建一个具备专业知识、友好交互的智能投顾系统。",
    businessBackground: "传统财富管理依赖人工顾问，成本高且服务容量有限。智能投顾能够7x24小时为客户提供专业建议，同时降低服务成本。关键是要确保AI的回答专业、准确且符合金融监管要求。",
    learningObjectives: [
      "掌握对话式AI系统的架构设计",
      "学会使用Streamlit快速构建AI应用前端",
      "理解System Prompt在角色塑造中的关键作用",
      "培养金融合规意识（免责声明、风险提示等）",
      "能够设计用户友好的对话交互流程"
    ],
    techStack: [
      {
        category: "后端技术",
        items: ["RAG技术栈（复用实验四）", "LangChain", "对话历史管理"]
      },
      {
        category: "前端技术",
        items: ["Streamlit", "Gradio", "聊天界面组件"]
      },
      {
        category: "业务逻辑",
        items: ["System Prompt工程", "会话状态管理", "合规检查模块"]
      }
    ],
    steps: [
      {
        title: "构建知识库",
        description: "准备投顾专业知识",
        tasks: [
          "复用实验四的RAG技术栈",
          "加载金融产品说明书作为知识源",
          "构建产品信息的向量索引",
          "测试知识库的检索效果"
        ]
      },
      {
        title: "设计System Prompt",
        description: "塑造AI顾问的专业形象",
        tasks: [
          "定义AI角色（专业、严谨、负责任的财富顾问）",
          "设置回答风格和语气",
          "内置合规要求（必须提示风险、不做承诺等）",
          "添加对话规则（如何处理超出知识范围的问题）"
        ]
      },
      {
        title: "搭建聊天界面",
        description: "使用Streamlit创建用户界面",
        tasks: [
          "创建聊天窗口和消息展示组件",
          "实现用户输入和消息发送功能",
          "添加对话历史记录功能",
          "优化界面样式和用户体验"
        ]
      },
      {
        title: "集成后端逻辑",
        description: "连接RAG和对话流程",
        tasks: [
          "将用户输入传递到RAG系统",
          "从知识库检索相关产品信息",
          "结合System Prompt生成回答",
          "在前端展示回答并自动添加免责声明",
          "实现多轮对话的上下文保持"
        ]
      }
    ],
    codeExamples: [
      {
        title: "Streamlit聊天界面",
        description: "快速搭建专业的对话式UI",
        language: "python",
        code: `import streamlit as st
from langchain.memory import ConversationBufferMemory

# 页面配置
st.set_page_config(
    page_title="智能财富顾问",
    page_icon="💰",
    layout="wide"
)

# 初始化会话状态
if "messages" not in st.session_state:
    st.session_state.messages = []
    
if "memory" not in st.session_state:
    st.session_state.memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )

# 页面标题
st.title("💰 智能财富管理顾问")
st.caption("基于AI技术的专业投资咨询服务")

# 侧边栏 - 免责声明
with st.sidebar:
    st.header("⚠️ 重要提示")
    st.warning("""
    本AI顾问仅提供信息参考，不构成投资建议。
    
    - 投资有风险，决策需谨慎
    - 请根据自身情况做出判断
    - 如需专业建议，请咨询持牌顾问
    """)
    
    if st.button("清除对话历史"):
        st.session_state.messages = []
        st.session_state.memory.clear()
        st.rerun()

# 显示历史消息
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 用户输入
if prompt := st.chat_input("请输入您的问题..."):
    # 添加用户消息
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # 生成AI回答（后续集成RAG）
    with st.chat_message("assistant"):
        with st.spinner("思考中..."):
            # TODO: 调用RAG系统
            response = "这里将集成RAG系统生成回答"
            st.markdown(response)
    
    st.session_state.messages.append({"role": "assistant", "content": response})`
      },
      {
        title: "System Prompt设计",
        description: "为AI财富顾问设定专业角色和规则",
        language: "python",
        code: `SYSTEM_PROMPT = """
你是"慧财AI"，一位专业、负责任的财富管理顾问助手。

# 你的角色定位
- 拥有丰富的金融产品知识和投资理论基础
- 善于用通俗易懂的语言解释复杂的金融概念
- 始终将客户利益放在首位，保持客观中立

# 核心工作原则
1. **仅基于知识库回答**
   - 仅使用检索到的产品文档和资料进行回答
   - 如果知识库中没有相关信息，诚实告知
   - 不编造数据、收益率或产品信息

2. **风险提示优先**
   - 提及任何产品时必须同时说明风险
   - 强调"历史业绩不代表未来表现"
   - 建议客户根据自身风险承受能力选择

3. **合规表达**
   - 不使用"保证收益""稳赚不赔"等绝对化语言
   - 不直接推荐"买入"或"卖出"
   - 建议措辞："您可以考虑...""这类产品可能适合..."

4. **专业服务**
   - 理解客户真实需求，主动询问投资目标和风险偏好
   - 对比不同产品时提供客观分析
   - 复杂情况建议咨询专业持牌顾问

# 回答格式规范
- 使用结构化表达（要点列举）
- 重要信息用**粗体**强调
- 涉及数据时标注来源和时间

# 禁止行为
❌ 承诺任何具体收益
❌ 给出明确的买卖建议
❌ 替代专业持牌顾问职责
❌ 询问或存储客户敏感信息（身份证号、银行卡号等）

现在，请以友好、专业的方式回答客户问题。
""".strip()

# 使用示例
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

template = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("user", "{question}")
])

llm = ChatOpenAI(model="gpt-4", temperature=0.3)
chain = template | llm

# 测试
response = chain.invoke({"question": "我想了解一下货币基金"})
print(response.content)`
      },
      {
        title: "完整RAG聊天系统",
        description: "集成知识库检索和对话生成",
        language: "python",
        code: `import streamlit as st
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# 初始化组件（仅首次运行）
@st.cache_resource
def init_rag_system():
    # 加载向量数据库
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma(
        persist_directory="./financial_products_db",
        embedding_function=embeddings
    )
    
    # 创建检索器
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    
    # 创建LLM
    llm = ChatOpenAI(model="gpt-4", temperature=0.3)
    
    # 创建对话记忆
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True,
        output_key="answer"
    )
    
    # 创建对话检索链
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        return_source_documents=True,
        verbose=True
    )
    
    return qa_chain

# 初始化系统
qa_chain = init_rag_system()

# Streamlit界面
st.title("💰 智能财富管理顾问")

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "您好！我是慧财AI顾问，请问有什么可以帮您？"}
    ]

# 显示消息历史
for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

# 用户输入
if prompt := st.chat_input():
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)
    
    with st.chat_message("assistant"):
        with st.spinner("分析中..."):
            # 调用RAG系统
            result = qa_chain({"question": prompt})
            answer = result["answer"]
            
            # 添加免责声明
            disclaimer = "\\n\\n---\\n*以上信息仅供参考，不构成投资建议。投资有风险，决策需谨慎。*"
            full_answer = answer + disclaimer
            
            st.write(full_answer)
            
            # 显示参考来源
            if result.get("source_documents"):
                with st.expander("📚 参考来源"):
                    for i, doc in enumerate(result["source_documents"], 1):
                        st.caption(f"{i}. {doc.metadata.get('source', 'Unknown')}")
    
    st.session_state.messages.append({"role": "assistant", "content": full_answer})`
      }
    ]
  },
  {
    id: "earnings-call-analyst",
    icon: Mic,
    title: "业绩电话会分析师",
    level: "顶点",
    duration: "6-8小时",
    description: "多模态、长文本处理的综合项目，自动完成转录、总结和洞察挖掘",
    skills: ["语音转文本", "长文本分析", "情感分析", "报告生成"],
    color: "from-violet-500 to-purple-500",
    detailedDescription: "业绩电话会是获取上市公司一手信息的重要渠道，但听取全程耗时巨大。本顶点项目将挑战多模态处理和长文本分析，构建一个能够自动转录音频、提炼要点、分析情绪的综合系统。",
    businessBackground: "分析师和投资者需要快速掌握业绩电话会的核心内容，但一场电话会通常长达1-2小时。AI自动分析系统能够在几分钟内完成转录和深度分析，帮助用户快速抓住关键信息和投资机会。",
    learningObjectives: [
      "掌握语音识别技术（Speech-to-Text）的应用",
      "学会处理和分析超长文本（token管理策略）",
      "理解金融文本的情感分析方法",
      "能够设计多维度的文本分析框架",
      "培养综合运用多种AI技术解决复杂问题的能力"
    ],
    techStack: [
      {
        category: "语音处理",
        items: ["OpenAI Whisper", "音频预处理", "时间戳对齐"]
      },
      {
        category: "文本分析",
        items: ["大语言模型", "情感分析", "关键信息抽取", "文本摘要"]
      },
      {
        category: "报告生成",
        items: ["结构化输出", "Markdown生成", "数据可视化"]
      }
    ],
    steps: [
      {
        title: "音频转录",
        description: "将语音转换为可分析的文本",
        tasks: [
          "使用OpenAI Whisper模型加载电话会音频",
          "执行语音识别转录",
          "生成带时间戳的文本记录",
          "进行转录文本的清洗和格式化"
        ]
      },
      {
        title: "核心内容摘要",
        description: "提炼电话会的关键信息",
        tasks: [
          "设计长文本处理策略（分段摘要或Map-Reduce）",
          "编写摘要Prompt（要求500字左右）",
          "提取核心财务数据和业绩亮点",
          "生成结构化的执行摘要"
        ]
      },
      {
        title: "情感与态度分析",
        description: "解读管理层的信心和态度",
        tasks: [
          "设计情感分析Prompt",
          "分析管理层发言的整体情绪倾向",
          "识别关键发言片段并引用原文",
          "量化信心指数（如：乐观/中性/悲观）"
        ]
      },
      {
        title: "Q&A环节分析",
        description: "挖掘分析师关注的焦点",
        tasks: [
          "从转录稿中分离Q&A环节",
          "提取分析师提出的所有问题",
          "识别被高频询问的Top 3议题",
          "分析管理层对敏感问题的回应策略"
        ]
      },
      {
        title: "生成分析报告",
        description: "整合所有分析结果",
        tasks: [
          "设计报告模板（包含摘要、情感、Q&A、投资建议等章节）",
          "汇总前面步骤的所有分析结果",
          "生成Markdown格式的完整报告",
          "添加数据可视化（如情感趋势图）"
        ]
      }
    ],
    codeExamples: [
      {
        title: "Whisper语音转录",
        description: "使用OpenAI Whisper将电话会音频转为文本",
        language: "python",
        code: `import openai
from pathlib import Path

def transcribe_earnings_call(audio_path):
    """使用Whisper转录业绩电话会音频
    
    Args:
        audio_path: 音频文件路径（支持mp3, wav, m4a等格式）
    
    Returns:
        带时间戳的完整转录文本
    """
    
    audio_file = open(audio_path, "rb")
    
    # 调用Whisper API进行转录
    transcript = openai.Audio.transcribe(
        model="whisper-1",
        file=audio_file,
        response_format="verbose_json",  # 获取详细信息包括时间戳
        language="zh",  # 指定语言为中文
    )
    
    # 提取转录文本
    full_text = transcript["text"]
    
    # 提取时间戳信息（用于后续分析）
    segments = transcript["segments"]
    
    print(f"✓ 转录完成")
    print(f"  音频时长：{transcript['duration']:.1f}秒")
    print(f"  文本长度：{len(full_text)}字符")
    print(f"  片段数量：{len(segments)}个\\n")
    
    # 格式化输出（带时间戳）
    formatted_transcript = ""
    for segment in segments:
        timestamp = f"[{segment['start']:.1f}s - {segment['end']:.1f}s]"
        text = segment['text']
        formatted_transcript += f"{timestamp} {text}\\n"
    
    return {
        "full_text": full_text,
        "formatted_text": formatted_transcript,
        "segments": segments,
        "duration": transcript["duration"]
    }

# 使用示例
result = transcribe_earnings_call("earnings_call_2024Q3.mp3")

# 保存转录文本
with open("transcript.txt", "w", encoding="utf-8") as f:
    f.write(result["formatted_text"])

print("转录文本已保存到 transcript.txt")`
      },
      {
        title: "长文本分段摘要",
        description: "使用Map-Reduce策略处理超长转录文本",
        language: "python",
        code: `import openai
from typing import List

def chunk_text(text: str, chunk_size: int = 3000) -> List[str]:
    """将长文本分割成多个chunk"""
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0
    
    for word in words:
        current_chunk.append(word)
        current_length += len(word) + 1
        
        if current_length >= chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            current_length = 0
    
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks

def summarize_chunk(chunk: str) -> str:
    """对单个chunk进行摘要"""
    prompt = f"""
    请总结以下业绩电话会片段的核心要点：
    
    {chunk}
    
    要求：
    - 提取关键财务数据和业绩亮点
    - 保留重要的管理层表态
    - 100-150字总结
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    
    return response.choices[0].message.content

def generate_final_summary(chunk_summaries: List[str]) -> str:
    """将所有chunk摘要合并成最终摘要"""
    combined = "\\n\\n".join([f"片段{i+1}：{s}" for i, s in enumerate(chunk_summaries)])
    
    prompt = f"""
    以下是业绩电话会各部分的摘要：
    
    {combined}
    
    请生成一份500字的执行摘要，包含：
    1. 业绩概览（营收、利润等核心数据）
    2. 业务亮点（3-5个要点）
    3. 管理层展望
    
    格式：Markdown
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    
    return response.choices[0].message.content

# 完整流程
def analyze_earnings_call(transcript: str):
    print("步骤1：分割文本...")
    chunks = chunk_text(transcript, chunk_size=3000)
    print(f"  分割成 {len(chunks)} 个片段\\n")
    
    print("步骤2：逐个摘要...")
    chunk_summaries = []
    for i, chunk in enumerate(chunks, 1):
        print(f"  处理片段 {i}/{len(chunks)}")
        summary = summarize_chunk(chunk)
        chunk_summaries.append(summary)
    
    print("\\n步骤3：生成最终摘要...\\n")
    final_summary = generate_final_summary(chunk_summaries)
    
    return final_summary

# 使用示例
final_summary = analyze_earnings_call(full_transcript)
print("=== 业绩电话会执行摘要 ===")
print(final_summary)`
      },
      {
        title: "情感分析与报告生成",
        description: "分析管理层态度并生成完整分析报告",
        language: "python",
        code: `import openai
import json

def sentiment_analysis(transcript: str) -> dict:
    """分析电话会的情感倾向"""
    
    prompt = f"""
    请分析以下业绩电话会转录文本中管理层的整体情感和态度。
    
    转录文本：
    {transcript[:4000]}  # 限制长度
    
    请按以下JSON格式输出分析结果：
    {{
      "overall_sentiment": "乐观/中性/悲观",
      "confidence_score": 0-100,
      "key_positive_signals": ["信号1", "信号2"],
      "key_concerns": ["担忧1", "担忧2"],
      "tone_description": "简要描述管理层的语气和态度",
      "notable_quotes": [
        {{"quote": "原文引用", "analysis": "分析"}}
      ]
    }}
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    
    return json.loads(response.choices[0].message.content)

def generate_analysis_report(summary: str, sentiment: dict, transcript: str) -> str:
    """生成完整的分析报告"""
    
    # 提取Q&A焦点
    qa_prompt = f"""
    从以下电话会转录中识别Q&A环节被高频询问的3个核心议题：
    
    {transcript[-2000:]}  # 通常Q&A在后半部分
    
    简要列出3个议题及管理层回应要点。
    """
    
    qa_response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": qa_prompt}],
        temperature=0.3
    )
    
    qa_analysis = qa_response.choices[0].message.content
    
    # 组装完整报告
    report = f"""
# 业绩电话会深度分析报告

## 📊 执行摘要
{summary}

---

## 💭 管理层情感分析

**整体倾向：** {sentiment['overall_sentiment']}  
**信心指数：** {sentiment['confidence_score']}/100

### 积极信号
{chr(10).join(f"- {s}" for s in sentiment['key_positive_signals'])}

### 主要担忧
{chr(10).join(f"- {c}" for c in sentiment['key_concerns'])}

### 语气评价
{sentiment['tone_description']}

### 关键发言
{chr(10).join(f"> {q['quote']}\\n\\n*分析：{q['analysis']}*\\n" for q in sentiment['notable_quotes'])}

---

## ❓ Q&A环节焦点
{qa_analysis}

---

## 💡 投资启示

基于本次电话会分析：
- **关注点：** [自动生成或手动补充]
- **风险提示：** [自动生成或手动补充]

---

*本报告由AI自动生成，仅供参考。*
"""
    
    return report

# 完整流程
sentiment_result = sentiment_analysis(full_transcript)
final_report = generate_analysis_report(
    summary=executive_summary,
    sentiment=sentiment_result,
    transcript=full_transcript
)

# 保存报告
with open("earnings_call_analysis.md", "w", encoding="utf-8") as f:
    f.write(final_report)

print("✓ 分析报告已生成：earnings_call_analysis.md")`
      }
    ]
  }
];

export const levelColors = {
  "基础": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "进阶": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "核心": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "综合": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "顶点": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
};
