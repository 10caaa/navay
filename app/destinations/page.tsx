"use client"

import { useState } from "react"
import {
  MessageSquarePlus,
  User,
  LogOut,
  Moon,
  Sun,
  Lightbulb,
  Menu,
  X,
  Bot,
  MapPin,
  Camera,
  Search,
  Filter,
  Star,
  Clock,
  Thermometer,
  Plane,
  Heart,
  Bookmark,
  Globe
} from "lucide-react"
import Link from "next/link"

export default function DestinationsPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const sidebarIcons = [
    { id: "new-chat", icon: MessageSquarePlus, label: "Nouvelle recherche", accent: false, href: "/" },
    { id: "projects", icon: Camera, label: "Mes voyages", badge: "Pro", href: "/mes-voyages" },
    { id: "artifacts", icon: MapPin, label: "Destinations", accent: true, href: "/destinations" },
  ]

  const profileMenuItems = [
    { icon: User, label: "Mon profil", href: "/profil" },
    { icon: Globe, label: "Gérer l'abonnement", href: "/abonnement" },
    { icon: Moon, label: "Préférences", href: "/preferences" },
    { icon: Lightbulb, label: "Centre d'aide", action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {}, danger: true },
  ]

  const categories = ["Tous", "Europe", "Asie", "Amérique", "Afrique", "Océanie"]

  const destinations = [
    {
      id: 1,
      nom: "Kyoto, Japon",
      pays: "Japon",
      continent: "Asie",
      image: "🏯",
      description: "Temples anciens, jardins zen et traditions séculaires",
      rating: 4.8,
      reviews: 1247,
      bestTime: "Mars-Mai, Sep-Nov",
      temperature: "15-25°C",
      flightTime: "11h",
      budget: "€€€",
      tags: ["Culture", "Temples", "Gastronomie"],
      highlights: ["Temple Fushimi Inari", "Quartier Gion", "Bambouseraie d'Arashiyama"]
    },
    {
      id: 2,
      nom: "Santorin, Grèce",
      pays: "Grèce",
      continent: "Europe",
      image: "🏝️",
      description: "Couchers de soleil magiques et architecture cycladique",
      rating: 4.7,
      reviews: 892,
      bestTime: "Avril-Octobre",
      temperature: "18-28°C",
      flightTime: "3h30",
      budget: "€€",
      tags: ["Plages", "Romance", "Couchers de soleil"],
      highlights: ["Village d'Oia", "Plage Rouge", "Vignobles de Santorini"]
    },
    {
      id: 3,
      nom: "Marrakech, Maroc",
      pays: "Maroc",
      continent: "Afrique",
      image: "🕌",
      description: "Souks colorés, palais somptueux et désert à proximité",
      rating: 4.6,
      reviews: 1156,
      bestTime: "Oct-Avril",
      temperature: "20-30°C",
      flightTime: "3h",
      budget: "€",
      tags: ["Culture", "Architecture", "Gastronomie"],
      highlights: ["Place Jemaa el-Fna", "Jardin Majorelle", "Palais de la Bahia"]
    },
    {
      id: 4,
      nom: "Bali, Indonésie",
      pays: "Indonésie",
      continent: "Asie",
      image: "🌺",
      description: "Rizières en terrasses, temples hindous et plages paradisiaques",
      rating: 4.5,
      reviews: 2031,
      bestTime: "Avril-Octobre",
      temperature: "26-30°C",
      flightTime: "14h",
      budget: "€€",
      tags: ["Nature", "Plages", "Spiritualité"],
      highlights: ["Rizières de Tegallalang", "Temple Tanah Lot", "Ubud"]
    },
    {
      id: 5,
      nom: "Patagonie, Argentine",
      pays: "Argentine",
      continent: "Amérique",
      image: "🏔️",
      description: "Glaciers majestueux, pics rocheux et nature sauvage",
      rating: 4.9,
      reviews: 567,
      bestTime: "Nov-Mars",
      temperature: "5-20°C",
      flightTime: "13h",
      budget: "€€€",
      tags: ["Nature", "Randonnée", "Aventure"],
      highlights: ["Glacier Perito Moreno", "Mont Fitz Roy", "El Calafate"]
    },
    {
      id: 6,
      nom: "Reykjavik, Islande",
      pays: "Islande",
      continent: "Europe",
      image: "🌋",
      description: "Aurores boréales, geysers et paysages volcaniques",
      rating: 4.7,
      reviews: 743,
      bestTime: "Sep-Mars (aurores)",
      temperature: "-2-15°C",
      flightTime: "3h",
      budget: "€€€",
      tags: ["Nature", "Aurores", "Géothermie"],
      highlights: ["Blue Lagoon", "Geysir", "Route du Cercle d'Or"]
    }
  ]

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.pays.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "Tous" || dest.continent === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case "€": return "text-green-600"
      case "€€": return "text-yellow-600"
      case "€€€": return "text-red-600"
      default: return "text-gray-600"
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
                Destinations
              </h1>
              <p className={`text-base ${
                isDarkTheme ? "text-slate-300" : "text-slate-600"
              }`}>
                Découvrez votre prochaine aventure
              </p>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="mb-8 space-y-4">
              {/* Recherche */}
              <div className={`relative rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkTheme ? "text-slate-400" : "text-slate-500"
                }`} />
                <input
                  type="text"
                  placeholder="Rechercher une destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none ${
                    isDarkTheme ? "text-slate-100 placeholder-slate-400" : "text-slate-700 placeholder-slate-500"
                  }`}
                />
              </div>

              {/* Filtres par continent */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                        : isDarkTheme
                          ? "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                          : "bg-white/70 text-slate-600 hover:bg-white/90 border border-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille des destinations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                    isDarkTheme 
                      ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70" 
                      : "bg-white/70 border-slate-200 hover:bg-white/90"
                  }`}
                >
                  {/* Header de la destination */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{destination.image}</div>
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          isDarkTheme ? "text-slate-100" : "text-slate-800"
                        }`}>
                          {destination.nom}
                        </h3>
                        <p className={`text-sm ${
                          isDarkTheme ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {destination.pays}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkTheme
                          ? "hover:bg-slate-600 text-slate-400 hover:text-red-400"
                          : "hover:bg-red-50 text-slate-500 hover:text-red-500"
                      }`}>
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkTheme
                          ? "hover:bg-slate-600 text-slate-400 hover:text-blue-400"
                          : "hover:bg-blue-50 text-slate-500 hover:text-blue-500"
                      }`}>
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-4 ${
                    isDarkTheme ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {destination.description}
                  </p>

                  {/* Rating et avis */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className={`text-sm font-medium ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        {destination.rating}
                      </span>
                    </div>
                    <span className={`text-sm ${
                      isDarkTheme ? "text-slate-400" : "text-slate-500"
                    }`}>
                      ({destination.reviews} avis)
                    </span>
                  </div>

                  {/* Infos pratiques */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className={`w-4 h-4 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`} />
                      <span className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        {destination.bestTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className={`w-4 h-4 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`} />
                      <span className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        {destination.temperature}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Plane className={`w-4 h-4 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`} />
                      <span className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        {destination.flightTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${getBudgetColor(destination.budget)}`}>
                        {destination.budget}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.map((tag, index) => (
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

                  {/* Points d'intérêt */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-medium mb-2 ${
                      isDarkTheme ? "text-slate-200" : "text-slate-700"
                    }`}>
                      À voir absolument:
                    </h4>
                    <ul className={`text-xs space-y-1 ${
                      isDarkTheme ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {destination.highlights.map((highlight, index) => (
                        <li key={index}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Bouton d'action */}
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg">
                    Planifier un voyage
                  </button>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className={`text-center py-12 ${
                isDarkTheme ? "text-slate-400" : "text-slate-500"
              }`}>
                <p className="text-lg mb-2">Aucune destination trouvée</p>
                <p className="text-sm">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
