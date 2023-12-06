import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import Auth from "./Authorize";
import Supabase from "./Supabase";
import { Session } from "@supabase/supabase-js";
import { View, Text } from "react-native";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    Supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    Supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
