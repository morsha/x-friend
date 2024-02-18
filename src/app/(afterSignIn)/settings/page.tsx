'use client'
import LogoutButton from "@/components/LogoutButton";
import isAuth from "@/components/isAuth";

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <LogoutButton />
    </div>
  );
}

export default isAuth(SettingsPage);
