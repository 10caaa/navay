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
  Globe,
  Bell,
  Shield,
  Palette,
  Languages,
  Download,
  Trash2,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Navigation,
  Clock,
  MapPin as Location,
  Plane,
  Star,
  Heart,
  Filter
} from "lucide-react"
import Link from "next/link"

export default function PreferencesPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  
  // Préférences d'état
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: false,
    deals: true,
    trips: true
  })
  
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    tripsVisible: true,
    analyticsOptOut: false,
    dataSharing: false
  })
  
  const [preferences, setPreferences] = useState({
    language: "fr",
    currency: "EUR",
    timezone: "Europe/Paris",
    units: "metric",
    soundEnabled: true,
    autoSave: true,
    offlineMode: false,
    highContrast: false
  })

  const sidebarIcons = [
    { id: "new-chat", icon: MessageSquarePlus, label: "Nouvelle recherche", accent: false, href: "/" },
    { id: "projects", icon: Camera, label: "Mes voyages", badge: "Pro", href: "/mes-voyages" },
    { id: "artifacts", icon: MapPin, label: "Destinations", href: "/destinations" },
  ]

  const profileMenuItems = [
    { icon: User, label: "Mon profil", href: "/profil" },
    { icon: Globe, label: "Gérer l'abonnement", href: "/abonnement" },
    { icon: Moon, label: "Préférences", href: "/preferences", active: true },
    { icon: Lightbulb, label: "Centre d'aide", action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {}, danger: true },
  ]

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" }
  ]

  const currencies = [
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "USD", name: "Dollar US", symbol: "$" },
    { code: "GBP", name: "Livre Sterling", symbol: "£" },
    { code: "JPY", name: "Yen", symbol: "¥" },
    { code: "CAD", name: "Dollar Canadien", symbol: "C$" },
    { code: "CHF", name: "Franc Suisse", symbol: "CHF" }
  ]

  const timezones = [
    { code: "Europe/Paris", name: "Paris (UTC+1)" },
    { code: "Europe/London", name: "Londres (UTC+0)" },
    { code: "America/New_York", name: "New York (UTC-5)" },
    { code: "America/Los_Angeles", name: "Los Angeles (UTC-8)" },
    { code: "Asia/Tokyo", name: "Tokyo (UTC+9)" },
    { code: "Australia/Sydney", name: "Sydney (UTC+10)" }
  ]

  const ToggleSwitch = ({ enabled, onChange, label, description }: {
    enabled: boolean
    onChange: (value: boolean) => void
    label: string
    description?: string
  }) => (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className={`font-medium ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
          {label}
        </div>
        {description && (
          <div className={`text-sm mt-1 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
            {description}
          </div>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          enabled ? "bg-emerald-500" : isDarkTheme ? "bg-slate-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  const SelectField = ({ value, onChange, options, label }: {
    value: string
    onChange: (value: string) => void
    options: Array<{ code: string; name: string; symbol?: string; flag?: string }>
    label: string
  }) => (
    <div>
      <label className={`block text-sm font-medium mb-2 ${
        isDarkTheme ? "text-slate-200" : "text-slate-700"
      }`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-lg border transition-colors ${
          isDarkTheme
            ? "bg-slate-700 border-slate-600 text-slate-200"
            : "bg-white border-slate-300 text-slate-700"
        }`}
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.flag && `${option.flag} `}{option.name}
            {option.symbol && ` (${option.symbol})`}
          </option>
        ))}
      </select>
    </div>
  )

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
            
            {/* Theme toggle */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkTheme
                  ? "hover:bg-slate-700 text-slate-300"
                  : "hover:bg-slate-100 text-slate-600"
              } ${!isSidebarOpen ? "ml-auto" : ""}`}
              title={isDarkTheme ? "Mode clair" : "Mode sombre"}
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 px-8 pt-16 pb-8 overflow-y-auto">
            {/* Titre de la page */}
            <div className="mb-8">
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkTheme ? "text-slate-100" : "text-slate-800"
              }`}>
                Préférences
              </h1>
              <p className={`text-base ${
                isDarkTheme ? "text-slate-300" : "text-slate-600"
              }`}>
                Personnalisez votre expérience Travel AI selon vos besoins
              </p>
            </div>

            <div className="space-y-8">
              {/* Langue et région */}
              <div className={`p-6 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Languages className="w-5 h-5 text-emerald-500" />
                  <h3 className={`text-xl font-semibold ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Langue et région
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    value={preferences.language}
                    onChange={(value) => setPreferences({...preferences, language: value})}
                    options={languages}
                    label="Langue"
                  />
                  
                  <SelectField
                    value={preferences.currency}
                    onChange={(value) => setPreferences({...preferences, currency: value})}
                    options={currencies}
                    label="Devise"
                  />
                  
                  <SelectField
                    value={preferences.timezone}
                    onChange={(value) => setPreferences({...preferences, timezone: value})}
                    options={timezones}
                    label="Fuseau horaire"
                  />
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkTheme ? "text-slate-200" : "text-slate-700"
                    }`}>
                      Unités de mesure
                    </label>
                    <select
                      value={preferences.units}
                      onChange={(e) => setPreferences({...preferences, units: e.target.value})}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        isDarkTheme
                          ? "bg-slate-700 border-slate-600 text-slate-200"
                          : "bg-white border-slate-300 text-slate-700"
                      }`}
                    >
                      <option value="metric">Métriques (km, °C)</option>
                      <option value="imperial">Impériales (miles, °F)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className={`p-6 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-5 h-5 text-emerald-500" />
                  <h3 className={`text-xl font-semibold ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Notifications
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <ToggleSwitch
                    enabled={notifications.email}
                    onChange={(value) => setNotifications({...notifications, email: value})}
                    label="Notifications par email"
                    description="Recevez des mises à jour par email"
                  />
                  
                  <ToggleSwitch
                    enabled={notifications.push}
                    onChange={(value) => setNotifications({...notifications, push: value})}
                    label="Notifications push"
                    description="Notifications directement sur votre appareil"
                  />
                  
                  <ToggleSwitch
                    enabled={notifications.sms}
                    onChange={(value) => setNotifications({...notifications, sms: value})}
                    label="Notifications SMS"
                    description="Alertes importantes par SMS"
                  />
                  
                  <ToggleSwitch
                    enabled={notifications.marketing}
                    onChange={(value) => setNotifications({...notifications, marketing: value})}
                    label="Communications marketing"
                    description="Offres spéciales et actualités"
                  />
                  
                  <ToggleSwitch
                    enabled={notifications.deals}
                    onChange={(value) => setNotifications({...notifications, deals: value})}
                    label="Alertes de prix"
                    description="Notifications quand les prix baissent"
                  />
                  
                  <ToggleSwitch
                    enabled={notifications.trips}
                    onChange={(value) => setNotifications({...notifications, trips: value})}
                    label="Rappels de voyage"
                    description="Notifications liées à vos voyages"
                  />
                </div>
              </div>

              {/* Confidentialité et sécurité */}
              <div className={`p-6 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <h3 className={`text-xl font-semibold ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Confidentialité et sécurité
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <ToggleSwitch
                    enabled={privacy.profilePublic}
                    onChange={(value) => setPrivacy({...privacy, profilePublic: value})}
                    label="Profil public"
                    description="Permettre aux autres utilisateurs de voir votre profil"
                  />
                  
                  <ToggleSwitch
                    enabled={privacy.tripsVisible}
                    onChange={(value) => setPrivacy({...privacy, tripsVisible: value})}
                    label="Voyages visibles"
                    description="Partager vos voyages avec la communauté"
                  />
                  
                  <ToggleSwitch
                    enabled={privacy.analyticsOptOut}
                    onChange={(value) => setPrivacy({...privacy, analyticsOptOut: value})}
                    label="Désactiver les analytics"
                    description="Ne pas participer aux analyses d'usage"
                  />
                  
                  <ToggleSwitch
                    enabled={privacy.dataSharing}
                    onChange={(value) => setPrivacy({...privacy, dataSharing: value})}
                    label="Partage de données"
                    description="Partager des données anonymisées pour améliorer le service"
                  />
                </div>
              </div>

              {/* Interface et expérience */}
              <div className={`p-6 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-5 h-5 text-emerald-500" />
                  <h3 className={`text-xl font-semibold ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Interface et expérience
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <ToggleSwitch
                    enabled={preferences.soundEnabled}
                    onChange={(value) => setPreferences({...preferences, soundEnabled: value})}
                    label="Sons activés"
                    description="Jouer les sons de notification et de feedback"
                  />
                  
                  <ToggleSwitch
                    enabled={preferences.autoSave}
                    onChange={(value) => setPreferences({...preferences, autoSave: value})}
                    label="Sauvegarde automatique"
                    description="Sauvegarder automatiquement vos recherches et préférences"
                  />
                  
                  <ToggleSwitch
                    enabled={preferences.offlineMode}
                    onChange={(value) => setPreferences({...preferences, offlineMode: value})}
                    label="Mode hors ligne"
                    description="Télécharger le contenu pour un accès hors ligne"
                  />
                  
                  <ToggleSwitch
                    enabled={preferences.highContrast}
                    onChange={(value) => setPreferences({...preferences, highContrast: value})}
                    label="Contraste élevé"
                    description="Améliorer la lisibilité avec des couleurs contrastées"
                  />
                </div>
              </div>

              {/* Gestion des données */}
              <div className={`p-6 rounded-xl border ${
                isDarkTheme 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-white/70 border-slate-200"
              }`}>
                <div className="flex items-center space-x-3 mb-6">
                  <Download className="w-5 h-5 text-emerald-500" />
                  <h3 className={`text-xl font-semibold ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Gestion des données
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <button className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    isDarkTheme
                      ? "border-slate-600 hover:bg-slate-600/50"
                      : "border-slate-300 hover:bg-slate-50"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
                          Exporter mes données
                        </div>
                        <div className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                          Télécharger toutes vos données personnelles
                        </div>
                      </div>
                      <Download className={`w-5 h-5 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`} />
                    </div>
                  </button>
                  
                  <button className={`w-full p-4 rounded-lg border text-left transition-colors border-red-300 hover:bg-red-50 ${
                    isDarkTheme ? "border-red-600 hover:bg-red-900/20" : ""
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-red-600">
                          Supprimer mon compte
                        </div>
                        <div className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                          Supprimer définitivement votre compte et toutes vos données
                        </div>
                      </div>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-300 dark:border-slate-600">
                <button className={`px-6 py-3 rounded-lg border transition-colors ${
                  isDarkTheme
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}>
                  Annuler
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
