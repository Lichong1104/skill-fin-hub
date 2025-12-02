import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate("/learning");
    } else {
      navigate("/login");
    }
  };
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[hsl(220,35%,8%)]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,40%,12%)] via-[hsl(230,35%,10%)] to-[hsl(220,35%,6%)]" />
        <img 
          src={heroBg} 
          alt="AI金融实验教学平台" 
          className="w-full h-full object-cover opacity-10"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,35%,6%)] via-transparent to-[hsl(220,35%,8%)/80]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">面向金融行业的专业AI能力培养体系</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-[hsl(240,80%,70%)] to-secondary bg-clip-text text-transparent">
              AI+金融
            </span>
            <br />
            <span className="text-white/95">实验教学平台</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            系统化构建<span className="text-primary font-semibold">AI技术认知</span>、
            <span className="text-primary font-semibold">金融业务理解</span>与
            <span className="text-primary font-semibold">实践应用能力</span>
            <br className="hidden md:block" />
            赋能金融从业者掌握智能化转型核心技能
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button variant="hero" size="lg" className="group" onClick={handleStartLearning}>
              进入学习平台
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" onClick={() => {
              document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              平台功能介绍
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold text-primary">6+</div>
              <div className="text-sm text-white/60">综合实战项目</div>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold text-primary">3</div>
              <div className="text-sm text-white/60">核心能力模块</div>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-white/60">场景化实践</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[hsl(200,80%,50%)]/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default Hero;
