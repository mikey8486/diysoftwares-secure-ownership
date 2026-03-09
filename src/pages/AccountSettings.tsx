import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Save, LogOut, Shield, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AccountSettings = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }
    setSavingProfile(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    if (!error) {
      // Also update profiles table
      await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user!.id);
      toast.success("Profile updated successfully!");
    } else {
      toast.error(error.message);
    }
    setSavingProfile(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (!error) {
      toast.success("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(error.message);
    }
    setSavingPassword(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: <User size={16} /> },
    { id: "security" as const, label: "Security", icon: <Shield size={16} /> },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-black mb-2">
          Account <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-muted-foreground">Manage your profile and security preferences</p>
      </motion.div>

      {/* Avatar / Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card rounded-2xl p-6 mb-6 flex items-center gap-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-2xl font-black shrink-0">
          {(user?.user_metadata?.full_name || user?.email || "?")[0].toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-foreground truncate">
            {user?.user_metadata?.full_name || "No name set"}
          </p>
          <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle size={12} className="text-neon-green" />
            <span className="text-xs text-muted-foreground">Verified account</span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="ml-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-destructive/50 hover:text-destructive px-4 py-2 rounded-xl transition-all shrink-0"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">Email address cannot be changed</p>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 gradient-btn px-6 py-3 rounded-xl text-primary-foreground font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-5">
                  Choose a strong password with at least 6 characters.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Strength indicator */}
                {newPassword.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          newPassword.length >= i * 3
                            ? i <= 1
                              ? "bg-destructive"
                              : i <= 2
                              ? "bg-yellow-500"
                              : i <= 3
                              ? "bg-neon-cyan"
                              : "bg-neon-green"
                            : "bg-border"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      {newPassword.length < 4
                        ? "Weak"
                        : newPassword.length < 7
                        ? "Fair"
                        : newPassword.length < 10
                        ? "Good"
                        : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-muted border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${
                      confirmPassword && confirmPassword !== newPassword
                        ? "border-destructive focus:border-destructive focus:ring-destructive"
                        : "border-border focus:border-primary focus:ring-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-xs text-destructive mt-1.5">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={savingPassword}
                className="flex items-center gap-2 gradient-btn px-6 py-3 rounded-xl text-primary-foreground font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Shield size={16} />
                {savingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSettings;
