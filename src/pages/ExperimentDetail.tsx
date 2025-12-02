import { useParams, useNavigate } from "react-router-dom";
import { experiments } from "@/data/experiments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Clock, Target, Code, CheckCircle2 } from "lucide-react";
import { levelColors } from "@/data/experiments";

const ExperimentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const experiment = experiments.find(exp => exp.id === id);

  if (!experiment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">实验未找到</h1>
          <Button onClick={() => navigate("/")}>返回首页</Button>
        </div>
      </div>
    );
  }

  const Icon = experiment.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/learning/project-lab")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回项目实战坊
          </Button>
          
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${experiment.color} flex items-center justify-center shadow-elegant flex-shrink-0`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">{experiment.title}</h1>
                <Badge className={levelColors[experiment.level as keyof typeof levelColors]}>
                  {experiment.level}
                </Badge>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-3xl">
                {experiment.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>预计时长：{experiment.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Business Background */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              业务背景
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {experiment.businessBackground}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Description */}
        <Card>
          <CardHeader>
            <CardTitle>实验详情</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {experiment.detailedDescription}
            </p>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              学习目标
            </CardTitle>
            <CardDescription>完成本实验后，您将能够：</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {experiment.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              技术栈
            </CardTitle>
            <CardDescription>本实验将使用以下技术和工具</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiment.techStack.map((stack, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-foreground">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, idx) => (
                      <Badge key={idx} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Core Skills */}
        <Card>
          <CardHeader>
            <CardTitle>核心技能点</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {experiment.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm py-1.5">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        {experiment.codeExamples && experiment.codeExamples.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">代码示例</h2>
            <div className="space-y-6">
              {experiment.codeExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="w-full">
                      <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">实验步骤</h2>
          <div className="space-y-6">
            {experiment.steps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle>{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {step.tasks.map((task, taskIdx) => (
                      <li key={taskIdx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        <span className="text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">准备好开始实验了吗？</h3>
                <p className="text-muted-foreground">
                  点击下方按钮，进入云端实验环境，开始您的AI金融之旅
                </p>
              </div>
              <Button 
                size="lg" 
                className="flex-shrink-0"
                onClick={() => window.open('http://116.204.67.82:8000/', '_blank')}
              >
                开始实验
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperimentDetail;
