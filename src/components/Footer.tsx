const Footer = () => {
  return (
    <footer className="bg-card border-t py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
              AI金融实验教学平台
            </h3>
            <p className="text-sm text-muted-foreground">
              培养下一代复合型AI金融人才
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">学习资源</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">知识中心</li>
              <li className="hover:text-primary cursor-pointer transition-colors">训练场</li>
              <li className="hover:text-primary cursor-pointer transition-colors">实战项目</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">关于我们</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">平台介绍</li>
              <li className="hover:text-primary cursor-pointer transition-colors">教学理念</li>
              <li className="hover:text-primary cursor-pointer transition-colors">联系我们</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">支持</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">使用文档</li>
              <li className="hover:text-primary cursor-pointer transition-colors">常见问题</li>
              <li className="hover:text-primary cursor-pointer transition-colors">技术支持</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AI金融实验教学平台. 专注培养AI金融复合型人才</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
