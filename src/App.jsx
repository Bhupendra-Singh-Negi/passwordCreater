import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPassword = useCallback(() => {
    if (!password) return;
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    passwordRef.current?.select();
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <main className="min-h-screen px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-zinc-900/90 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="mb-8 flex flex-col gap-4 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-300">
            Secure password builder
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Password Generator
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Generate a strong password instantly. Adjust the length, include
            numbers and symbols, and copy it with one click.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-50/10 p-6 shadow-inner shadow-black/10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="passwordOutput">
              Generated password
            </label>
            <input
              id="passwordOutput"
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-full flex-1 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-200/40"
            />
            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={copyPassword}
              disabled={!password}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
                <span>Password length</span>
                <span className="font-semibold text-white">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="24"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-red-400"
              />
            </div>

            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-red-400/40">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                  className="h-5 w-5 rounded border-slate-200 bg-slate-800 text-red-500 focus:ring-red-400"
                />
                <div>
                  <p className="font-medium text-white">Include numbers</p>
                  <p className="text-xs text-slate-400">
                    Adds digits for better strength
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-red-400/40">
                <input
                  type="checkbox"
                  checked={characterAllowed}
                  onChange={() => setCharacterAllowed((prev) => !prev)}
                  className="h-5 w-5 rounded border-slate-200 bg-slate-800 text-red-500 focus:ring-red-400"
                />
                <div>
                  <p className="font-medium text-white">Include symbols</p>
                  <p className="text-xs text-slate-400">
                    Adds special characters for maximum security
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-100">
            <p className="font-medium">Tip:</p>
            <p className="mt-2 text-slate-200">
              Use a password manager to store this securely and regenerate
              whenever you need a fresh password.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
