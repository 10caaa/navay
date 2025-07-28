"use client"

import { useState } from "react"
import {
  MessageSquarePlus,
  Clock,
  Archive,
  User,
  LogOut,
  Moon,
  Sun,
  Compass,
  Zap,
  Eye,
  Wand2,
  Globe,
  Paperclip,
  Search,
  Lightbulb,
  Menu,
  X,
  Bot,
  MapPin,
  Plane,
  Camera,
} from "lucide-react"
import Link from "next/link"

export default function NavayInterface() {
  const [inputValue, setInputValue] = useState("")
  const [activeIcon, setActiveIcon] = useState("new-chat")
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const sidebarIcons = [
    { id: "new-chat", icon: MessageSquarePlus, label: "Nouvelle recherche", accent: true, href: "/" },
    { id: "projects", icon: Camera, label: "Mes voyages", badge: "Pro", href: "/mes-voyages" },
    { id: "artifacts", icon: MapPin, label: "Destinations", href: "/destinations" },
  ]

  const recentChats = [
    "Voyage en Thaïlande pour amoureux de cuisine",
    "Randonnée dans les Alpes suisses",
    "Road trip côte ouest américaine",
    "Temples et culture au Japon",
    "Safari photo au Kenya",
    "Plages paradisiaques Maldives",
    "Architecture gothique Europe",
    "Aventure Patagonie Argentine",
  ]

  const profileMenuItems = [
    { icon: User, label: "Mon profil", href: "/profil" },
    { icon: Globe, label: "Gérer l'abonnement", href: "/abonnement" },
    { icon: Moon, label: "Préférences", href: "/preferences" },
    { icon: Lightbulb, label: "Centre d'aide", action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {}, danger: true },
  ]

  const suggestionTags = [
    { label: "Aventure", icon: Compass, color: "text-emerald-600" },
    { label: "Culture", icon: Eye, color: "text-amber-600" },
    { label: "Détente", icon: Wand2, color: "text-blue-600" },
    { label: "Nature", icon: Globe, color: "text-green-600" },
  ]

  return (
    <div className={`h-screen flex transition-all duration-500 ${
      isDarkTheme 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" 
        : "bg-gradient-to-br from-slate-50 to-blue-50"
    }`}>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-20'} flex flex-col py-6 relative z-10 sidebar-transition`}>
        
        {/* Logo IA au top */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105">
            <Bot className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <div className={`ml-3 font-semibold text-lg transition-colors duration-300 ${
              isDarkTheme ? "text-slate-100" : "text-slate-700"
            }`}>
              Travel AI
            </div>
          )}
        </div>

        {/* Navigation principale */}
        <div className="flex flex-col px-4 space-y-2 mb-auto">
          {sidebarIcons.map((item, index) => (
            <Link key={item.id} href={item.href || "/"}>
              <button
                onClick={() => setActiveIcon(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group relative hover:scale-[1.02] ${
                  item.accent
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl"
                    : activeIcon === item.id 
                      ? isDarkTheme 
                        ? "bg-slate-800 text-slate-200 shadow-md" 
                        : "bg-slate-100 text-slate-700 shadow-md"
                      : isDarkTheme
                        ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
                
                {isSidebarOpen && (
                  <div className="flex items-center justify-between w-full ml-3">
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip pour sidebar fermée */}
                {!isSidebarOpen && (
                  <div className={`absolute left-full ml-2 px-2 py-1 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
                    isDarkTheme ? "bg-slate-600" : "bg-slate-700"
                  }`}>
                    {item.label}
                  </div>
                )}
              </button>
            </Link>
          ))}
        </div>

        {/* Section Récents */}
        {isSidebarOpen && (
          <div className="flex-1 px-4 pb-4 overflow-hidden min-h-0">
            <h3 className={`text-xs font-medium mb-3 ${
              isDarkTheme ? "text-slate-400" : "text-slate-500"
            }`}>
              RÉCENTS
            </h3>
            <div className="space-y-1 overflow-y-auto h-full">
              {recentChats.map((chat, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors duration-200 hover:scale-[1.01] ${
                    isDarkTheme
                      ? "text-slate-300 hover:bg-slate-800 hover:text-slate-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <div className="truncate">
                    {chat.length > 35 ? `${chat.substring(0, 35)}...` : chat}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Profil utilisateur en bas */}
        <div className="relative">
          {/* Menu drop-up */}
          {isProfileMenuOpen && isSidebarOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsProfileMenuOpen(false)}
              />
              
              {/* Menu */}
              <div className={`absolute bottom-full left-0 right-0 mb-2 mx-4 rounded-t-lg shadow-lg border-t border-l border-r z-40 ${
                isDarkTheme
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-200"
              }`}>
                {profileMenuItems.map((item, index) => (
                  <div key={index}>
                    {index === profileMenuItems.length - 1 && (
                      <div className={`border-t mx-4 ${
                        isDarkTheme ? "border-slate-700" : "border-slate-200"
                      }`} />
                    )}
                    {item.href ? (
                      <Link href={item.href}>
                        <button
                          onClick={() => setIsProfileMenuOpen(false)}
                          className={`w-full flex items-center p-3 text-sm transition-all duration-200 ${
                            item.danger
                              ? isDarkTheme
                                ? "text-rose-400 hover:bg-rose-900/20"
                                : "text-rose-600 hover:bg-rose-50"
                              : isDarkTheme
                                ? "text-slate-200 hover:bg-slate-800"
                                : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.label}
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          item.action?.()
                          setIsProfileMenuOpen(false)
                        }}
                        className={`w-full flex items-center p-3 text-sm transition-all duration-200 ${
                          item.danger
                            ? isDarkTheme
                              ? "text-rose-400 hover:bg-rose-900/20"
                              : "text-rose-600 hover:bg-rose-50"
                            : isDarkTheme
                              ? "text-slate-200 hover:bg-slate-800"
                              : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Zone profil cliquable */}
          <button
            onClick={() => isSidebarOpen && setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`w-full p-4 rounded-lg ${
              isSidebarOpen 
                ? isDarkTheme
                  ? "hover:bg-slate-800 transition-colors duration-200"
                  : "hover:bg-slate-50 transition-colors duration-200"
                : ""
            }`}
          >
            <div className="flex items-center">
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                TA
              </div>
              
              {isSidebarOpen && (
                <div className="ml-3 flex-1 text-left">
                  <div className={`text-sm font-medium ${
                    isDarkTheme ? "text-slate-200" : "text-slate-700"
                  }`}>
                    Travel Assistant
                  </div>
                  <div className={`text-xs ${
                    isDarkTheme ? "text-slate-400" : "text-slate-500"
                  }`}>
                    Forfait Free
                  </div>
                </div>
              )}
              
              {isSidebarOpen && (
                <svg className={`w-4 h-4 transition-transform duration-200 ${
                  isProfileMenuOpen ? "rotate-180" : ""
                } ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Main Content - Floating Card */}
      <div className="flex-1 p-2 pl-1 relative">
        {/* Bouton Toggle Sidebar - intégré dans la zone blanche */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`absolute top-4 left-4 z-20 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDarkTheme
                ? "hover:bg-teal-800/50 hover:shadow-md"
                : "hover:bg-teal-100/70 hover:shadow-md"
            }`}
            title="Ouvrir la sidebar"
          >
            <Menu className={`w-4 h-4 transition-colors duration-200 ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`} />
          </button>
        )}

        <div className={`h-full rounded-3xl flex flex-col shadow-lg relative transition-all duration-300 ${
          isDarkTheme
            ? "bg-slate-800/70 backdrop-blur-sm border border-slate-700/50"
            : "bg-white/80 backdrop-blur-sm border border-white/50"
        }`}>
          {/* Header avec badge Pro et bouton fermer sidebar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            {isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkTheme
                    ? "hover:bg-slate-700 hover:shadow-md"
                    : "hover:bg-slate-100 hover:shadow-md"
                }`}
                title="Fermer la sidebar"
              >
                <X className={`w-4 h-4 transition-colors duration-200 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`} />
              </button>
            )}
            <div className={`bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-shadow duration-200 hover:shadow-md ${
              !isSidebarOpen ? "ml-auto" : ""
            }`}>
              Travel Pro
            </div>
          </div>

          {/* Contenu principal centré */}
          <div className="flex-1 flex flex-col items-center justify-center px-12 pt-12">
            {/* Titre principal */}
            <h1 className={`text-2xl font-semibold mb-4 text-center transition-colors duration-300 ${
              isDarkTheme ? "text-slate-100" : "text-slate-800"
            }`}>
              Où souhaitez-vous voyager ?
            </h1>
            
            {/* Suggestions rapides */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {suggestionTags.map((tag, index) => (
                <button
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                    isDarkTheme
                      ? "bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 hover:border-teal-400 text-slate-200 hover:text-teal-300"
                      : "bg-white/80 hover:bg-white border border-slate-200 hover:border-teal-300 text-slate-600 hover:text-teal-700"
                  }`}
                >
                  <tag.icon className={`w-4 h-4 ${
                    isDarkTheme
                      ? tag.color.replace("600", "400") // Couleurs plus claires en mode sombre
                      : tag.color
                  }`} />
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>

            {/* Boîte de saisie principale */}
            <div className="w-full max-w-3xl">
              <div className={`relative rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
                isDarkTheme
                  ? "bg-slate-700/90 backdrop-blur-sm border border-slate-600 hover:border-teal-500"
                  : "bg-white/90 backdrop-blur-sm border border-teal-100 hover:border-teal-200"
              }`}>
                {/* Input */}
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Décrivez vos hobbies et préférences de voyage..."
                  className={`w-full bg-transparent border-none outline-none resize-none text-base pr-12 transition-colors duration-300 ${
                    isDarkTheme
                      ? "placeholder-slate-400 text-slate-100"
                      : "placeholder-slate-400 text-slate-700"
                  }`}
                  rows={3}
                />

                {/* Boutons en bas de l'input */}
                <div className="flex items-center justify-between mt-3">
                  {/* Boutons à gauche */}
                  <div className="flex items-center space-x-3">
                    <button className={`flex items-center space-x-2 p-1.5 rounded-lg transition-colors ${
                      isDarkTheme
                        ? "text-slate-400 hover:text-teal-300 hover:bg-teal-900/30"
                        : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                    }`}>
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <button className={`flex items-center space-x-2 p-1.5 rounded-lg transition-colors ${
                      isDarkTheme
                        ? "text-slate-400 hover:text-teal-300 hover:bg-teal-900/30"
                        : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                    }`}>
                      <Search className="w-4 h-4" />
                      <span className="text-sm font-medium">Recherche</span>
                    </button>

                    <button className={`flex items-center space-x-2 p-1.5 rounded-lg transition-colors ${
                      isDarkTheme
                        ? "text-slate-400 hover:text-amber-300 hover:bg-amber-900/30"
                        : "text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                    }`}>
                      <Lightbulb className="w-4 h-4" />
                      <span className="text-sm font-medium">Suggestions</span>
                    </button>

                    <button className={`p-1.5 rounded-lg transition-colors ${
                      isDarkTheme
                        ? "text-slate-400 hover:text-slate-300 hover:bg-slate-600/50"
                        : "text-slate-500 hover:text-slate-600 hover:bg-slate-50"
                    }`}>
                      <span className="text-lg">•••</span>
                    </button>
                  </div>

                  {/* Bouton d'envoi */}
                  <button className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-sm hover:shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer avec informations */}
          <div className="px-12 pb-6 text-center">
            <p className={`text-sm mb-1 transition-colors duration-300 ${
              isDarkTheme ? "text-slate-300" : "text-slate-600"
            }`}>
              Découvrez des destinations personnalisées selon vos passions et hobbies.
            </p>
            <p className={`text-xs transition-colors duration-300 ${
              isDarkTheme ? "text-slate-400" : "text-slate-400"
            }`}>
              Notre IA analyse vos préférences pour vous suggérer les meilleurs voyages.
            </p>
            <p className={`text-xs mt-2 transition-colors duration-300 ${
              isDarkTheme ? "text-slate-400" : "text-slate-400"
            }`}>
              Laissez-vous inspirer par de nouvelles aventures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
