import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, BookOpen, Video, FileText, GraduationCap, Clock } from "lucide-react";

const knowledgeModules = [
  {
    category: "AI基础知识",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    courses: [
      {
        id: "llm-basics",
        title: "大语言模型工作原理",
        duration: "45分钟",
        type: "视频",
        level: "基础",
        description: "深入理解Transformer架构、注意力机制和LLM的核心原理",
        detailedContent: "课程详细内容：本课程将深入讲解大语言模型的工作原理，包括Transformer架构、注意力机制、预训练与微调等核心概念。学习完成后，您将理解LLM的技术基础，为后续实践应用打下坚实基础。"
      },
      {
        id: "prompt-engineering",
        title: "Prompt Engineering基础",
        duration: "30分钟",
        type: "图文",
        level: "基础",
        description: "掌握提示词工程的基本方法和最佳实践",
        detailedContent: "课程详细内容：Prompt Engineering是与AI对话的艺术。本课程将教您如何设计高质量的提示词，包括角色设定、任务描述、格式控制等技巧，让大语言模型产生更准确、更有价值的输出。"
      },
      {
        id: "rag-tech",
        title: "RAG技术详解",
        duration: "60分钟",
        type: "视频",
        level: "进阶",
        description: "检索增强生成技术的原理、架构和实践应用",
        detailedContent: "课程详细内容：RAG是当前最主流的企业级AI应用架构。本课程将深入讲解RAG的完整技术栈，包括文档加载、向量化、检索、生成等环节，帮助您构建基于私有知识库的智能问答系统。"
      },
      {
        id: "ai-agent",
        title: "AI Agent架构设计",
        duration: "50分钟",
        type: "视频",
        level: "进阶",
        description: "理解自主智能体的设计模式和实现方法",
        detailedContent: "课程详细内容：AI Agent代表了AI应用的新范式。本课程将带您理解Agent的核心组件（大脑、记忆、工具、规划）、主流框架（ReAct、crewAI）以及实现方法，让AI从被动响应变为主动行动。"
      }
    ]
  },
  {
    category: "金融科技应用",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    courses: [
      {
        id: "smart-research",
        title: "智能投研系统",
        duration: "40分钟",
        type: "案例",
        level: "核心",
        description: "AI在投资研究领域的应用案例和技术架构",
        detailedContent: "课程详细内容：智能投研系统是AI在金融领域最成功的应用之一。本课程将剖析AI如何重塑投资研究流程，从信息收集、文本分析、财务分析到研报生成的全链路智能化，帮助您理解AI如何提升投研效率。"
      },
      {
        id: "smart-risk",
        title: "智能风控体系",
        duration: "45分钟",
        type: "案例",
        level: "核心",
        description: "金融风险管理中的AI技术应用与实践",
        detailedContent: "课程详细内容：金融机构的生命线是风险管理。本课程将展示AI如何革新传统风控体系，包括智能信用评分、反欺诈、舆情监控、市场风险管理等，实现从被动防御到主动预警的转变。"
      },
      {
        id: "regtech",
        title: "RegTech监管科技",
        duration: "35分钟",
        type: "图文",
        level: "进阶",
        description: "合规科技的发展趋势和AI应用场景",
        detailedContent: "课程详细内容：RegTech运用AI等新技术简化合规流程、降低合规成本。本课程介绍反洗钱、合规报告自动化、政策变化监控、数据隐私保护等核心应用场景和技术实现。"
      },
      {
        id: "smart-wealth",
        title: "智能财富管理",
        duration: "40分钟",
        type: "案例",
        level: "核心",
        description: "智能投顾和个性化资产配置的实现路径",
        detailedContent: "课程详细内容：智能财富管理正在重塑财富管理行业。本课程将介绍智能投顾的技术实现、资产配置算法、个性化推荐策略，以及如何通过AI降低服务门槛、提升个性化水平。"
      }
    ]
  }
];

const typeIcons = {
  "视频": Video,
  "图文": FileText,
  "案例": BookOpen
};

const levelColors = {
  "基础": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "进阶": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "核心": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
};

const KnowledgeCenter = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-background border-b">
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-elegant flex-shrink-0">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary/40">学</div>
                <h1 className="text-4xl md:text-5xl font-bold">知识学习中心</h1>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-3xl">
                系统学习AI技术原理与金融业务逻辑，为实践操作打下坚实基础
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {knowledgeModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <div key={index} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">{module.category}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {module.courses.map((course, idx) => {
                  const TypeIcon = typeIcons[course.type as keyof typeof typeIcons];
                  return (
                    <Card 
                      key={idx}
                      className="group hover:scale-105 cursor-pointer"
                      onClick={() => handleCourseClick(course)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="w-5 h-5 text-primary" />
                            <span className="text-sm text-muted-foreground">{course.type}</span>
                          </div>
                          <Badge className={levelColors[course.level as keyof typeof levelColors]}>
                            {course.level}
                          </Badge>
                        </div>
                        
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            查看详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">学习建议</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>建议先学习AI基础知识，理解技术原理后再学习金融应用</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>每个课程都配有配套练习，学完后可前往"技能训练场"进行实操</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>记录学习笔记，建立自己的知识体系</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCourse.title}</DialogTitle>
                <DialogDescription>{selectedCourse.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className={levelColors[selectedCourse.level as keyof typeof levelColors]}>
                    {selectedCourse.level}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{selectedCourse.duration}</span>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedCourse.detailedContent}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  关闭
                </Button>
                <Button onClick={() => {
                  if (selectedCourse?.id) {
                    navigate(`/learning/knowledge/${selectedCourse.id}`);
                  }
                  setIsDialogOpen(false);
                }}>
                  开始学习
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeCenter;
