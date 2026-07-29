import { supabase, createAuthClient } from "../config/supabase.js";

export async function register(req, res) {
  const { name, email, password, role } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim() || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!["traveler", "owner"].includes(role)) {
    return res.status(400).json({ error: "Invalid role." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });
  }

  const { data: userData, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (createError) {
    return res.status(400).json({ error: createError.message });
  }

  const userId = userData.user.id;

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: userId, full_name: name, role });

  if (profileError) {
    await supabase.auth.admin.deleteUser(userId);
    return res
      .status(500)
      .json({ error: "Failed to create profile: " + profileError.message });
  }

  const authClient = createAuthClient();
  const { data: sessionData, error: signInError } =
    await authClient.auth.signInWithPassword({ email, password });

  if (signInError) {
    return res.status(201).json({
      user: { id: userId, name, email, role },
      session: null,
      message: "Account created. Please log in.",
    });
  }

  return res.status(201).json({
    user: { id: userId, name, email, role },
    session: sessionData.session,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const authClient = createAuthClient();
  const { data, error } = await authClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    return res
      .status(500)
      .json({ error: "Logged in, but failed to load profile." });
  }

  return res.status(200).json({
    user: profile,
    session: data.session,
  });
}