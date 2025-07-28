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
  Crown,
  Check,
  CreditCard,
  Calendar,
  Globe,
  Zap,
  Star,
  Shield,
  Users,
  Plane
} from "lucide-react"
import Link from "next/link"

export default function AbonnementPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [billingCycle, setBillingCycle] = useState("monthly")

  const sidebarIcons = [
    { id: "new-chat", icon: MessageSquarePlus, label: "Nouvelle recherche", accent: false, href: "/" },
    { id: "projects", icon: Camera, label: "Mes voyages", badge: "Pro", href: "/mes-voyages" },
    { id: "artifacts", icon: MapPin, label: "Destinations", href: "/destinations" },
  ]

  const profileMenuItems = [
    { icon: User, label: "Mon profil", href: "/profil" },
    { icon: Globe, label: "Gérer l'abonnement", href: "/abonnement", active: true },
    { icon: Moon, label: "Préférences", href: "/preferences" },
    { icon: Lightbulb, label: "Centre d'aide", action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {}, danger: true },
  ]

  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Parfait pour commencer",
      features: [
        "3 recherches par mois",
        "Suggestions de base",
        "Accès aux destinations populaires",
        "Support par email"
      ],
      limitations: [
        "Pas de planification avancée",
        "Pas de recommandations personnalisées",
        "Pas d'accès aux offres exclusives"
      ],
      color: "slate",
      current: true
    },
    {
      id: "pro",
      name: "Travel Pro",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "Pour les voyageurs passionnés",
      features: [
        "Recherches illimitées",
        "Planification d'itinéraires avancée",
        "Recommandations IA personnalisées",
        "Accès aux destinations exclusives",
        "Alertes prix et offres",
        "Support prioritaire",
        "Synchronisation multi-appareils",
        "Mode hors ligne"
      ],
      color: "emerald",
      popular: true
    },
    {
      id: "premium",
      name: "Travel Premium",
      price: { monthly: 19.99, yearly: 199.99 },
      description: "L'expérience ultime",
      features: [
        "Tout du plan Pro",
        "Conciergerie voyage 24/7",
        "Accès VIP aux événements",
        "Réservations groupées",
        "Assurance voyage incluse",
        "Guide personnel IA",
        "Réductions partenaires",
        "Accès anticipé aux nouvelles fonctionnalités"
      ],
      color: "purple"
    }
  ]

  const currentPlan = plans.find(plan => plan.current) || plans[0]

  const getColorClasses = (color: string, variant: "bg" | "text" | "border") => {
    const colors = {
      slate: { bg: "bg-slate-500", text: "text-slate-600", border: "border-slate-300" },
      emerald: { bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-300" },
      purple: { bg: "bg-purple-500", text: "text-purple-600", border: "border-purple-300" }
    }
    return colors[color as keyof typeof colors]?.[variant] || colors.slate[variant]
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
                            item.active
                              ? "bg-emerald-100 text-emerald-700"
                              : item.danger
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
                Gérer mon abonnement
              </h1>
              <p className={`text-base ${
                isDarkTheme ? "text-slate-300" : "text-slate-600"
              }`}>
                Choisissez le plan qui correspond à vos besoins de voyage
              </p>
            </div>

            {/* Abonnement actuel */}
            <div className={`p-6 rounded-xl border mb-8 ${
              isDarkTheme 
                ? "bg-slate-700/50 border-slate-600" 
                : "bg-white/70 border-slate-200"
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Abonnement actuel: {currentPlan.name}
                  </h3>
                  <p className={`${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
                    {currentPlan.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                      Renouvelé le 15 avril 2024
                    </span>
                    <span className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                      Prochain renouvellement: 15 mai 2024
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    {currentPlan.price.monthly === 0 ? "Gratuit" : `${currentPlan.price.monthly}€`}
                  </div>
                  {currentPlan.price.monthly > 0 && (
                    <div className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                      par mois
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Toggle facturation */}
            <div className="flex items-center justify-center mb-8">
              <div className={`p-1 rounded-lg border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    billingCycle === "monthly"
                      ? "bg-emerald-500 text-white shadow-md"
                      : isDarkTheme
                        ? "text-slate-300 hover:text-slate-100"
                        : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    billingCycle === "yearly"
                      ? "bg-emerald-500 text-white shadow-md"
                      : isDarkTheme
                        ? "text-slate-300 hover:text-slate-100"
                        : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Annuel
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* Plans d'abonnement */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                    plan.popular 
                      ? "ring-2 ring-emerald-500" 
                      : ""
                  } ${
                    selectedPlan === plan.id
                      ? isDarkTheme
                        ? "bg-slate-600/50 border-emerald-500"
                        : "bg-emerald-50 border-emerald-300"
                      : isDarkTheme 
                        ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70" 
                        : "bg-white/70 border-slate-200 hover:bg-white/90"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                        Populaire
                      </span>
                    </div>
                  )}

                  {plan.current && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isDarkTheme
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        Actuel
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDarkTheme ? "text-slate-100" : "text-slate-800"
                    }`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${
                      isDarkTheme ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {plan.description}
                    </p>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-emerald-600">
                        {plan.price[billingCycle as keyof typeof plan.price] === 0 
                          ? "Gratuit" 
                          : `${plan.price[billingCycle as keyof typeof plan.price]}€`
                        }
                      </div>
                      {plan.price[billingCycle as keyof typeof plan.price] > 0 && (
                        <div className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                          par {billingCycle === "monthly" ? "mois" : "an"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className={`text-sm ${
                          isDarkTheme ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.limitations?.map((limitation, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span className={`text-sm ${
                          isDarkTheme ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      plan.current
                        ? isDarkTheme
                          ? "bg-slate-600 text-slate-300"
                          : "bg-slate-200 text-slate-600"
                        : plan.id === "free"
                          ? isDarkTheme
                            ? "border border-slate-600 text-slate-300 hover:bg-slate-700"
                            : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md hover:shadow-lg"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current 
                      ? "Plan actuel" 
                      : plan.id === "free" 
                        ? "Downgrade vers Free"
                        : "Upgrade vers " + plan.name
                    }
                  </button>
                </div>
              ))}
            </div>

            {/* Méthodes de paiement */}
            <div className={`p-6 rounded-xl border mb-8 ${
              isDarkTheme 
                ? "bg-slate-700/50 border-slate-600" 
                : "bg-white/70 border-slate-200"
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkTheme ? "text-slate-100" : "text-slate-800"
              }`}>
                Méthodes de paiement
              </h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  isDarkTheme 
                    ? "bg-slate-600/50 border-slate-500" 
                    : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className={`w-5 h-5 ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`} />
                      <div>
                        <div className={`font-medium ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
                          •••• •••• •••• 4242
                        </div>
                        <div className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                          Expire 12/26
                        </div>
                      </div>
                    </div>
                    <button className={`text-sm text-emerald-600 hover:text-emerald-700`}>
                      Modifier
                    </button>
                  </div>
                </div>
                
                <button className={`w-full p-4 border-2 border-dashed rounded-lg transition-colors ${
                  isDarkTheme
                    ? "border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                    : "border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-600"
                }`}>
                  + Ajouter une méthode de paiement
                </button>
              </div>
            </div>

            {/* Historique des factures */}
            <div className={`p-6 rounded-xl border ${
              isDarkTheme 
                ? "bg-slate-700/50 border-slate-600" 
                : "bg-white/70 border-slate-200"
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkTheme ? "text-slate-100" : "text-slate-800"
              }`}>
                Historique des factures
              </h3>
              
              <div className="space-y-3">
                {[
                  { date: "15 avril 2024", montant: "0€", statut: "Payé", plan: "Free" },
                  { date: "15 mars 2024", montant: "0€", statut: "Payé", plan: "Free" },
                  { date: "15 février 2024", montant: "0€", statut: "Payé", plan: "Free" }
                ].map((facture, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkTheme ? "bg-slate-600/30" : "bg-slate-50"
                  }`}>
                    <div>
                      <div className={`font-medium ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
                        {facture.plan} - {facture.date}
                      </div>
                      <div className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                        {facture.montant}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        facture.statut === "Payé"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {facture.statut}
                      </span>
                      <button className="text-sm text-emerald-600 hover:text-emerald-700">
                        Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
