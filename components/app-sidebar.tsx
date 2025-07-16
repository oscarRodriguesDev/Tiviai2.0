"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react";
import {
  Brain,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Shield,
  User,
  UserPlus,
  Users,
  Wallet,
  BookOpen,
  Activity,
  TrendingUp,
  MessageSquare,
  History,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { showErrorMessage } from "@/src/app/util/messages";



// Menu items organized by category
const menuItems = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      badge: null,
    },
    {
      title: "Feed",
      url: "/feed",
      icon: MessageSquare,
      badge: "2",
    },
  ],
  patients: [
    {
      title: "Cadastro de Pacientes",
      url: "/pacientes/cadastro",
      icon: UserPlus,
      badge: null,
    },
    {
      title: "Meus Pacientes",
      url: "/pacientes",
      icon: Users,
      badge: "12",
    },
  ],
  schedule: [
    {
      title: "Agendamentos",
      url: "/agendamentos",
      icon: Calendar,
      badge: "3",
    },
    {
      title: "Meus Atendimentos",
      url: "/meus-atendimentos",
      icon: History,
      badge: null,
    },
  ],
  resources: [
    {
      title: "Base Científica",
      url: "/base-cientifica",
      icon: BookOpen,
      badge: "Novo",
    },
  ],
  financial: [
    {
      title: "Financeiro",
      url: "/financeiro",
      icon: DollarSign,
      badge: null,
    },
    {
      title: "Créditos",
      url: "/creditos",
      icon: Wallet,
      badge: "150",
    },
  ],
  admin: [
    {
      title: "Novos Psicólogos",
      url: "/admin/psicologos",
      icon: User,
      badge: "5",
    },
    {
      title: "Novos Administradores",
      url: "/admin/administradores",
      icon: Shield,
      badge: null,
    },
  ],
}

// User data
const userData = {
  name: "Mocado Maria Silva",
  email: "maria.silva@email.com",
  avatar: "/placeholder.svg?height=40&width=40",
  crp: "CRP 06/123456",
  plan: "Premium",
}




export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession();
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [crp, setCrp] = useState<string | null>(null);
  const [plano, setPlano] = useState<string | null>(null);

  // User data
  const userData = {
    name: nome || "sem nome",
    role: role || "",
    avatar: fotoPerfil || "/placeholder.svg?height=40&width=40",
    plan: "Premium",
  }
  const sessao = useSession();


  // Função de Logout usando o signOut do NextAuth
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });

  };

  //recuperar foto do perfil
  useEffect(() => {
    setNome(session?.user?.name || "sem nome");
    if (session?.user?.role === 'ADMIN') {
      setRole("Administrador");
    } else {
      setRole("Psicólogo");
    }
    const fetchFotoPerfil = async () => {
      try {
        const response = await fetch(`/api/uploads?userId=${session?.user?.id}`);
        const data = await response.json();
        setFotoPerfil(data.url);
        // Passa apenas a parte relativa para o estado
      } catch (error) {
        showErrorMessage(`Erro ao buscar dados do usuario ${error}`);
      }
    };
    fetchFotoPerfil();
  }, [session?.user?.id]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-black dark:text-white">TiviAi</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Plataforma Psicológica</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Patient Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestão de Pacientes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.patients.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Schedule */}
        <SidebarGroup>
          <SidebarGroupLabel>Agenda</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.schedule.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Resources */}
        <SidebarGroup>
          <SidebarGroupLabel>Recursos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.resources.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Financial */}
        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.financial.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Administration */}
        <SidebarGroup>
          <SidebarGroupLabel>Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.admin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userData.name}</span>
                   
                  </div>
                  <div className="ml-auto">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {userData.plan}
                    </Badge>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
              >
                <DropdownMenuItem onClick={() => (window.location.href = "/perfil")}>
                  <User className="h-4 w-4 mr-2" />
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/configuracoes")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/atividade")}>
                  <Activity className="h-4 w-4 mr-2" />
                  Atividade
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/relatorios")}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Relatórios
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400"
                  onClick={() => (handleLogout())}
                >
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
