import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import { experiments, levelColors } from "@/data/experiments";

const ProjectLab = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-background border-b">
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-elegant flex-shrink-0">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary/40">用</div>
                <h1 className="text-4xl md:text-5xl font-bold">项目实战坊</h1>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-3xl">
                在高仿真的商业场景中，端到端地完成源于真实金融业务需求的综合性项目
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Section Description */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            每个实战项目都配有详细的业务背景、任务指引和真实数据集。
            您将作为项目负责人，综合运用在"知识学习中心"和"技能训练场"所学的知识与技能，
            解决真实的金融业务问题。
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <Card 
                key={index}
                className="group hover:scale-105 transition-all cursor-pointer h-full flex flex-col"
                onClick={() => navigate(`/experiment/${exp.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-elegant`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className={levelColors[exp.level as keyof typeof levelColors]}>
                        {exp.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{exp.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {exp.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {exp.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    <div className="text-sm font-semibold text-muted-foreground">核心技能：</div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/experiment/${exp.id}`);
                    }}
                  >
                    查看详情
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Project Tips */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">项目建议</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>建议按照难度从"基础"到"顶点"循序渐进地完成项目</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>每个项目都需要综合运用多个技能点，遇到困难可回到"知识学习中心"和"技能训练场"复习</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>项目完成后，可以尝试扩展功能或优化性能，深化理解</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectLab;
