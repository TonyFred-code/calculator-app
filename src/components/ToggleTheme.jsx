import { func, string } from "prop-types";

const options = [{ value: "dark" }, { value: "light" }, { value: "purple" }];

export default function ToggleTheme({ theme, setTheme }) {
  return (
    <div>
      <p>theme</p>
      <div
        role="radiogroup"
        aria-label="Theme"
        className="
          inline-flex items-center gap-1
          rounded-full border border-slate-200 dark:border-slate-700
          bg-slate-100 dark:bg-slate-800
          p-1
        "
      >
        {options.map((option) => {
          const { value } = option;
          const active = theme === value;
          return (
            <button
              key={value}
              role="radio"
              aria-checked={active}
              onClick={() => setTheme(value)}
              className={`
                flex items-center gap-1 px-3 py-1.5 rounded-full text-sm
                transition-colors text-foreground
                ${active && "bg-background shadow-sm"}
              `}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

ToggleTheme.propTypes = {
  theme: string.isRequired,
  setTheme: func.isRequired,
};
