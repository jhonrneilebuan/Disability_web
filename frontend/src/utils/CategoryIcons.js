import { 
    Briefcase, Code, Users, LineChart, Settings, PaintBrush, DollarSign, 
    Factory, FileText, Heart, HardHat, Gavel, Music, Tv, GraduationCap 
  } from "lucide-react"; 
  
  const categoryIcons = {
    ALL: () => <Briefcase className="w-10 h-10 text-gray-500" />,
    DESIGN: () => <PaintBrush className="w-10 h-10 text-blue-500" />,
    DEVELOPMENT: () => <Code className="w-10 h-10 text-green-500" />,
    MARKETING: () => <LineChart className="w-10 h-10 text-red-500" />,
    SALES: () => <DollarSign className="w-10 h-10 text-purple-500" />,
    ENGINEERING: () => <Factory className="w-10 h-10 text-yellow-500" />,
    HR: () => <Users className="w-10 h-10 text-pink-500" />,
    FINANCE: () => <DollarSign className="w-10 h-10 text-teal-500" />,
    MANAGEMENT: () => <Settings className="w-10 h-10 text-indigo-500" />,
    PRODUCT: () => <FileText className="w-10 h-10 text-cyan-500" />,
    CUSTOMER_SUPPORT: () => <Users className="w-10 h-10 text-orange-500" />,
    OPERATIONS: () => <Settings className="w-10 h-10 text-blue-600" />,
    RESEARCH: () => <FileText className="w-10 h-10 text-purple-600" />,
    EDUCATION: () => <GraduationCap className="w-10 h-10 text-green-600" />,
    ADMINISTRATION: () => <Users className="w-10 h-10 text-gray-600" />,
    IT: () => <Code className="w-10 h-10 text-blue-400" />,
    CONSULTING: () => <Briefcase className="w-10 h-10 text-pink-400" />,
    HEALTHCARE: () => <Heart className="w-10 h-10 text-red-400" />,
    CONSTRUCTION: () => <HardHat className="w-10 h-10 text-yellow-600" />,
    LEGAL: () => <Gavel className="w-10 h-10 text-indigo-600" />,
    ART: () => <Music className="w-10 h-10 text-purple-400" />,
    MEDIA: () => <Tv className="w-10 h-10 text-blue-300" />,
  };
  
  export default categoryIcons;
  