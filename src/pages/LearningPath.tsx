import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Dumbbell, Rocket, ArrowLeft, ArrowRight } from "lucide-react";

const modules = [
  {
    id: "knowledge",
    icon: BookOpen,
    title: "知识学习中心",
    subtitle: "学",
    description: "系统掌握AI与金融的交叉知识，夯实理论基础",
    features: ["AI基础知识库", "金融科技知识库", "视频微课", "核心论文导读"],
    color: "from-blue-500 to-cyan-500",
    path: "/learning/knowledge"
  },
  {
    id: "practice",
    icon: Dumbbell,
    title: "技能训练场",
    subtitle: "练",
    description: "针对核心技术点进行原子化、高强度的专项练习",
    features: ["LLM API调用", "LangChain实战", "AI Agent框架", "多模态处理"],
    color: "from-purple-500 to-pink-500",
    path: "/learning/practice"
  },
  {
    id: "projects",
    icon: Rocket,
    title: "项目实战坊",
    subtitle: "用",
    description: "在高仿真商业场景中，综合运用所学解决真实业务问题",
    features: ["六大综合项目", "端到端实战", "业务场景模拟", "能力综合考核"],
    color: "from-green-500 to-emerald-500",
    path: "/learning/project-lab"
  }
];

const LearningPath = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              选择您的<span className="text-primary">学习路径</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              遵循"学-练-用"三位一体的教学理念，循序渐进地掌握AI金融核心能力
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.id}
                className="group hover:scale-105 cursor-pointer h-full flex flex-col relative overflow-hidden"
                onClick={() => navigate(module.path)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <CardHeader className="text-center pb-4">
                  {/* Icon */}
                  <div className="mx-auto mb-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-elegant`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Subtitle Badge */}
                  <div className="text-6xl font-bold text-primary/20 mb-2">
                    {module.subtitle}
                  </div>
                  
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed pt-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between">
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="text-sm font-semibold text-muted-foreground">核心内容：</div>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${module.color}`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    variant="outline" 
                    className="w-full group/btn border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(module.path);
                    }}
                  >
                    进入模块
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Path Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">循序渐进的学习体系</h3>
                <p className="text-muted-foreground leading-relaxed">
                  建议按照"学→练→用"的顺序进行学习。先在<span className="text-primary font-semibold">知识学习中心</span>建立理论基础，
                  然后在<span className="text-primary font-semibold">技能训练场</span>进行专项技能训练，
                  最后在<span className="text-primary font-semibold">项目实战坊</span>中综合运用所学知识解决实际问题。
                  当然，您也可以根据自己的基础和需求，灵活选择学习路径。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
