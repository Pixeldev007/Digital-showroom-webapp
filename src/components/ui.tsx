import type { ChangeEvent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn--${variant} btn--${size}${fullWidth ? " btn--block" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning";
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export function ScreenFrame({
  title,
  route,
  children,
}: {
  title: string;
  route: string;
  children: ReactNode;
}) {
  return (
    <section className="screen-frame">
      <div className="screen-frame__meta">
        <div>
          <h3>{title}</h3>
          <span>{route}</span>
        </div>
        <Badge tone="primary">Production Pattern</Badge>
      </div>
      <div className="screen-frame__surface">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
        {hint ? <small>{hint}</small> : null}
      </span>
      {children}
    </label>
  );
}

export function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value) : undefined}
      readOnly={!onChange && value !== undefined}
    />
  );
}

export function Select({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
}) {
  const selectOptions = options ?? (value ? [value] : []);

  return (
    <div className="input input--select">
      <select
        className="input__native-select"
        value={value ?? ""}
        onChange={onChange ? (event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value) : undefined}
        disabled={!onChange && selectOptions.length <= 1}
      >
        {placeholder && !value ? <option value="">{placeholder}</option> : null}
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="caret">v</span>
    </div>
  );
}

export function TextArea({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <textarea
      className="input input--textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value) : undefined}
      readOnly={!onChange && value !== undefined}
    />
  );
}

export function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <Card className="stat-card">
      <span className="stat-card__label">{label}</span>
      <strong>{value}</strong>
      <span className="stat-card__delta">{delta}</span>
    </Card>
  );
}

export function MiniPhone({ children }: { children: ReactNode }) {
  return (
    <div className="mini-phone">
      <div className="mini-phone__notch" />
      <div className="mini-phone__screen">{children}</div>
    </div>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
