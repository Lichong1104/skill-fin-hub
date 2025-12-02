import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Database, GraduationCap, Zap } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "海量数据中心",
    description: "内置结构化的金融行业数据集，包括股票行情、财务报表、研究报告等"
  },
  {
    icon: Cloud,
    title: "云端实验环境",
    description: "预置所有必需库，打开浏览器即可开始实验，无需繁琐配置"
  },
  {
    icon: GraduationCap,
    title: "专家指导体系",
    description: "每个项目配有详细的背景介绍、任务指引和最佳实践指导"
  },
  {
    icon: Zap,
    title: "实时反馈机制",
    description: "即时代码执行反馈，帮助学生快速定位问题并持续改进"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            强大的<span className="text-primary">支撑系统</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            为您的学习之旅提供全方位的技术和资源保障
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:scale-105 cursor-pointer text-center border-2 hover:border-primary/50"
              >
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
