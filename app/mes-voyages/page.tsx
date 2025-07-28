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
  Calendar,
  Star,
  Heart,
  Share,
  Edit,
  Trash2
} from "lucide-react"
import Link from "next/link"

export default function MesVoyagesPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const sidebarIcons = [
    { id: "new-chat", icon: MessageSquarePlus, label: "Nouvelle recherche", accent: false, href: "/" },
    { id: "projects", icon: Camera, label: "Mes voyages", badge: "Pro", accent: true, href: "/mes-voyages" },
    { id: "artifacts", icon: MapPin, label: "Destinations", href: "/destinations" },
  ]

  const profileMenuItems = [
    { icon: User, label: "Mon profil", href: "/profil" },
    { icon: Globe, label: "Gérer l'abonnement", href: "/abonnement" },
    { icon: Moon, label: "Préférences", href: "/preferences" },
    { icon: Lightbulb, label: "Centre d'aide", action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {}, danger: true },
  ]

  const voyages = [
    {
      id: 1,
      titre: "Voyage en Thaïlande",
      description: "Découverte de la cuisine locale et des temples",
      destination: "Bangkok, Chiang Mai",
      dates: "15-28 Mars 2024",
      duree: "14 jours",
      budget: "2,850€",
      status: "Terminé",
      rating: 5,
      image: "🇹🇭",
      tags: ["Cuisine", "Culture", "Temples"]
    },
    {
      id: 2,
      titre: "Road Trip Côte Ouest",
      description: "De San Francisco à Los Angeles en passant par la Highway 1",
      destination: "Californie, USA",
      dates: "5-18 Juillet 2024",
      duree: "14 jours",
      budget: "4,200€",
      status: "Terminé",
      rating: 4,
      image: "🇺🇸",
      tags: ["Road Trip", "Nature", "Plages"]
    },
    {
      id: 3,
      titre: "Safari au Kenya",
      description: "Safari photo dans le Masai Mara et Amboseli",
      destination: "Kenya, Afrique",
      dates: "10-22 Septembre 2024",
      duree: "12 jours",
      budget: "3,600€",
      status: "Planifié",
      rating: 0,
      image: "🇰🇪",
      tags: ["Safari", "Photographie", "Animaux"]
    },
    {
      id: 4,
      titre: "Aventure en Patagonie",
      description: "Randonnée et exploration des glaciers",
      destination: "Argentine, Chili",
      dates: "2-16 Décembre 2024",
      duree: "14 jours",
      budget: "3,900€",
      status: "En cours",
      rating: 0,
      image: "🏔️",
      tags: ["Randonnée", "Nature", "Aventure"]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé": return "bg-green-100 text-green-800 border-green-200"
      case "En cours": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Planifié": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

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
          <Link href="/">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </Link>
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
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group relative hover:scale-[1.02] ${
                  item.accent
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl"
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
        {/* Bouton Toggle Sidebar */}
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
          {/* Header */}
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

          {/* Contenu principal */}
          <div className="flex-1 px-8 pt-16 pb-8 overflow-y-auto">
            {/* Titre de la page */}
            <div className="mb-8">
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkTheme ? "text-slate-100" : "text-slate-800"
              }`}>
                Mes Voyages
              </h1>
              <p className={`text-base ${
                isDarkTheme ? "text-slate-300" : "text-slate-600"
              }`}>
                Gérez et revivez vos aventures de voyage
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`p-4 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="text-2xl font-bold text-emerald-600">4</div>
                <div className={`text-sm ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
                  Voyages totaux
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className={`text-sm ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
                  Pays visités
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="text-2xl font-bold text-purple-600">54</div>
                <div className={`text-sm ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
                  Jours de voyage
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="text-2xl font-bold text-orange-600">14,550€</div>
                <div className={`text-sm ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
                  Budget total
                </div>
              </div>
            </div>

            {/* Liste des voyages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {voyages.map((voyage) => (
                <div
                  key={voyage.id}
                  className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                    isDarkTheme 
                      ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70" 
                      : "bg-white/70 border-slate-200 hover:bg-white/90"
                  }`}
                >
                  {/* Header du voyage */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{voyage.image}</div>
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          isDarkTheme ? "text-slate-100" : "text-slate-800"
                        }`}>
                          {voyage.titre}
                        </h3>
                        <p className={`text-sm ${
                          isDarkTheme ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {voyage.destination}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {voyage.status === "Terminé" && voyage.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < voyage.rating 
                                  ? "text-yellow-500 fill-current" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(voyage.status)}`}>
                        {voyage.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-4 ${
                    isDarkTheme ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {voyage.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {voyage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full ${
                          isDarkTheme
                            ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Détails du voyage */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className={`font-medium ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Dates:
                      </span>
                      <div className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        {voyage.dates}
                      </div>
                    </div>
                    <div>
                      <span className={`font-medium ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Durée:
                      </span>
                      <div className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        {voyage.duree}
                      </div>
                    </div>
                    <div>
                      <span className={`font-medium ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Budget:
                      </span>
                      <div className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        {voyage.budget}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                    <div className="flex items-center space-x-2">
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkTheme
                          ? "hover:bg-slate-600 text-slate-400 hover:text-slate-200"
                          : "hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                      }`}>
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkTheme
                          ? "hover:bg-slate-600 text-slate-400 hover:text-slate-200"
                          : "hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                      }`}>
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        isDarkTheme
                          ? "hover:bg-emerald-900/30 text-emerald-300 hover:text-emerald-200"
                          : "hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700"
                      }`}>
                        <Edit className="w-4 h-4 inline mr-1" />
                        Modifier
                      </button>
                      <button className={`p-1.5 rounded-lg transition-colors ${
                        isDarkTheme
                          ? "hover:bg-red-900/30 text-red-400 hover:text-red-300"
                          : "hover:bg-red-50 text-red-500 hover:text-red-600"
                      }`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton d'ajout */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                + Ajouter un nouveau voyage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
