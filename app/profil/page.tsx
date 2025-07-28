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
  Edit,
  Mail,
  Phone,
  Calendar,
  Globe,
  Shield,
  Bell,
  Eye,
  Save
} from "lucide-react"
import Link from "next/link"

export default function ProfilPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [profileData, setProfileData] = useState({
    nom: "Jean Dupont",
    email: "jean.dupont@email.com",
    telephone: "+33 6 12 34 56 78",
    dateNaissance: "1990-05-15",
    ville: "Paris, France",
    bio: "Passionné de voyages et de découvertes culturelles. J'aime explorer de nouvelles destinations et partager mes expériences.",
    preferences: {
      newsletter: true,
      notifications: true,
      profilPublic: false,
      partageLocalisation: false
    }
  })

  const sidebarIcons = [
    { id: "new-chat", icon: MessageSquarePlus, label: "Nouvelle recherche", accent: false, href: "/" },
    { id: "projects", icon: Camera, label: "Mes voyages", badge: "Pro", href: "/mes-voyages" },
    { id: "artifacts", icon: MapPin, label: "Destinations", href: "/destinations" },
  ]

  const profileMenuItems = [
    { icon: User, label: "Mon profil", href: "/profil", active: true },
    { icon: Globe, label: "Gérer l'abonnement", href: "/abonnement" },
    { icon: Moon, label: "Préférences", href: "/preferences" },
    { icon: Lightbulb, label: "Centre d'aide", action: () => {} },
    { icon: LogOut, label: "Se déconnecter", action: () => {}, danger: true },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Ici vous sauvegarderiez les données
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('preferences.')) {
      const prefField = field.replace('preferences.', '')
      setProfileData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: value
        }
      }))
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }))
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
            <div className="flex items-center space-x-3">
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-xs font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Sauvegarder</span>
                </button>
              )}
              <div className={`bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-shadow duration-200 hover:shadow-md ${
                !isSidebarOpen ? "ml-auto" : ""
              }`}>
                Travel Pro
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 px-8 pt-16 pb-8 overflow-y-auto">
            {/* Titre de la page */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Mon Profil
                  </h1>
                  <p className={`text-base ${
                    isDarkTheme ? "text-slate-300" : "text-slate-600"
                  }`}>
                    Gérez vos informations personnelles
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    isEditing
                      ? "bg-red-100 border-red-200 text-red-700 hover:bg-red-50"
                      : isDarkTheme
                        ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {isEditing ? "Annuler" : "Modifier"}
                </button>
              </div>
            </div>

            <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Colonne de gauche - Photo et infos de base */}
              <div className="lg:col-span-1">
                {/* Photo de profil */}
                <div className={`p-6 rounded-xl border mb-6 ${
                  isDarkTheme 
                    ? "bg-slate-700/50 border-slate-600" 
                    : "bg-white/70 border-slate-200"
                }`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      JD
                    </div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      isDarkTheme ? "text-slate-100" : "text-slate-800"
                    }`}>
                      {profileData.nom}
                    </h3>
                    <p className={`text-sm ${
                      isDarkTheme ? "text-slate-300" : "text-slate-600"
                    }`}>
                      Membre depuis Mars 2024
                    </p>
                    {isEditing && (
                      <button className="mt-3 px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        Changer la photo
                      </button>
                    )}
                  </div>
                </div>

                {/* Statistiques */}
                <div className={`p-6 rounded-xl border ${
                  isDarkTheme 
                    ? "bg-slate-700/50 border-slate-600" 
                    : "bg-white/70 border-slate-200"
                }`}>
                  <h4 className={`font-semibold mb-4 ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Mes statistiques
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        Voyages
                      </span>
                      <span className={`font-medium ${isDarkTheme ? "text-slate-100" : "text-slate-800"}`}>
                        4
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        Pays visités
                      </span>
                      <span className={`font-medium ${isDarkTheme ? "text-slate-100" : "text-slate-800"}`}>
                        12
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                        Jours de voyage
                      </span>
                      <span className={`font-medium ${isDarkTheme ? "text-slate-100" : "text-slate-800"}`}>
                        54
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne de droite - Informations détaillées */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informations personnelles */}
                <div className={`p-6 rounded-xl border ${
                  isDarkTheme 
                    ? "bg-slate-700/50 border-slate-600" 
                    : "bg-white/70 border-slate-200"
                }`}>
                  <h4 className={`font-semibold mb-6 ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Informations personnelles
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Nom complet
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.nom}
                          onChange={(e) => handleInputChange('nom', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDarkTheme
                              ? "bg-slate-600 border-slate-500 text-slate-100"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      ) : (
                        <p className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                          {profileData.nom}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDarkTheme
                              ? "bg-slate-600 border-slate-500 text-slate-100"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      ) : (
                        <p className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                          {profileData.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Téléphone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.telephone}
                          onChange={(e) => handleInputChange('telephone', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDarkTheme
                              ? "bg-slate-600 border-slate-500 text-slate-100"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      ) : (
                        <p className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                          {profileData.telephone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Date de naissance
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={profileData.dateNaissance}
                          onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDarkTheme
                              ? "bg-slate-600 border-slate-500 text-slate-100"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      ) : (
                        <p className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                          {new Date(profileData.dateNaissance).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Ville
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.ville}
                          onChange={(e) => handleInputChange('ville', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDarkTheme
                              ? "bg-slate-600 border-slate-500 text-slate-100"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      ) : (
                        <p className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                          {profileData.ville}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkTheme ? "text-slate-200" : "text-slate-700"
                      }`}>
                        Biographie
                      </label>
                      {isEditing ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={4}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDarkTheme
                              ? "bg-slate-600 border-slate-500 text-slate-100"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      ) : (
                        <p className={isDarkTheme ? "text-slate-300" : "text-slate-600"}>
                          {profileData.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Préférences de confidentialité */}
                <div className={`p-6 rounded-xl border ${
                  isDarkTheme 
                    ? "bg-slate-700/50 border-slate-600" 
                    : "bg-white/70 border-slate-200"
                }`}>
                  <h4 className={`font-semibold mb-6 ${
                    isDarkTheme ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Confidentialité et notifications
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className={`font-medium ${
                          isDarkTheme ? "text-slate-200" : "text-slate-700"
                        }`}>
                          Newsletter
                        </h5>
                        <p className={`text-sm ${
                          isDarkTheme ? "text-slate-400" : "text-slate-500"
                        }`}>
                          Recevoir les dernières offres et conseils voyage
                        </p>
                      </div>
                      <button
                        onClick={() => handleInputChange('preferences.newsletter', !profileData.preferences.newsletter)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          profileData.preferences.newsletter
                            ? "bg-emerald-500"
                            : isDarkTheme
                              ? "bg-slate-600"
                              : "bg-slate-300"
                        }`}
                        disabled={!isEditing}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          profileData.preferences.newsletter ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className={`font-medium ${
                          isDarkTheme ? "text-slate-200" : "text-slate-700"
                        }`}>
                          Notifications push
                        </h5>
                        <p className={`text-sm ${
                          isDarkTheme ? "text-slate-400" : "text-slate-500"
                        }`}>
                          Recevoir des notifications sur l'application
                        </p>
                      </div>
                      <button
                        onClick={() => handleInputChange('preferences.notifications', !profileData.preferences.notifications)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          profileData.preferences.notifications
                            ? "bg-emerald-500"
                            : isDarkTheme
                              ? "bg-slate-600"
                              : "bg-slate-300"
                        }`}
                        disabled={!isEditing}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          profileData.preferences.notifications ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className={`font-medium ${
                          isDarkTheme ? "text-slate-200" : "text-slate-700"
                        }`}>
                          Profil public
                        </h5>
                        <p className={`text-sm ${
                          isDarkTheme ? "text-slate-400" : "text-slate-500"
                        }`}>
                          Permettre aux autres utilisateurs de voir votre profil
                        </p>
                      </div>
                      <button
                        onClick={() => handleInputChange('preferences.profilPublic', !profileData.preferences.profilPublic)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          profileData.preferences.profilPublic
                            ? "bg-emerald-500"
                            : isDarkTheme
                              ? "bg-slate-600"
                              : "bg-slate-300"
                        }`}
                        disabled={!isEditing}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          profileData.preferences.profilPublic ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className={`font-medium ${
                          isDarkTheme ? "text-slate-200" : "text-slate-700"
                        }`}>
                          Partage de localisation
                        </h5>
                        <p className={`text-sm ${
                          isDarkTheme ? "text-slate-400" : "text-slate-500"
                        }`}>
                          Permettre le partage de votre position pour des recommandations
                        </p>
                      </div>
                      <button
                        onClick={() => handleInputChange('preferences.partageLocalisation', !profileData.preferences.partageLocalisation)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          profileData.preferences.partageLocalisation
                            ? "bg-emerald-500"
                            : isDarkTheme
                              ? "bg-slate-600"
                              : "bg-slate-300"
                        }`}
                        disabled={!isEditing}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                          profileData.preferences.partageLocalisation ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
