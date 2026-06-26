import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ value, onChange }: Props) {
  return (
    <form className="Search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="stasjon-sok">Søk etter stasjon</label>
      <input
        id="stasjon-sok"
        type="text"
        placeholder="Skriv inn stasjonsnavn..."
        value={value}
        onChange={onChange}
      />
      <button type="submit">Søk</button>
    </form>
  );
}
