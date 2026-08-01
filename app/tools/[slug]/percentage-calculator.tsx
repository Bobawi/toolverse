"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ResultCard from "@/components/ui/ResultCard";

type Mode = "percentage-of" | "percentage-change" | "value-from-percentage";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("percentage-of");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (mode === "percentage-of") {
      if (!num1 || !num2) return;
      const pct = (Number(num1) / Number(num2)) * 100;
      setResult(`${num1} is ${pct.toFixed(2)}% of ${num2}`);
    } else if (mode === "percentage-change") {
      if (!num1 || !num2) return;
      const change = ((Number(num2) - Number(num1)) / Number(num1)) * 100;
      const direction = change >= 0 ? "increase" : "decrease";
      setResult(`${Math.abs(change).toFixed(2)}% ${direction} from ${num1} to ${num2}`);
    } else if (mode === "value-from-percentage") {
      if (!num1 || !num2) return;
      const val = (Number(num1) / 100) * Number(num2);
      setResult(`${num1}% of ${num2} = ${val.toFixed(2)}`);
    }
  };

  const getLabel = () => {
    switch (mode) {
      case "percentage-of":
        return { first: "Number A", second: "Number B", btn: "Calculate %" };
      case "percentage-change":
        return { first: "Original value", second: "New value", btn: "Calculate Change" };
      case "value-from-percentage":
        return { first: "Percentage %", second: "Total value", btn: "Calculate Value" };
    }
  };

  const labels = getLabel();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={mode === "percentage-of" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("percentage-of"); setResult(null); }}
        >
          A is what % of B?
        </Button>
        <Button
          variant={mode === "percentage-change" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("percentage-change"); setResult(null); }}
        >
          % Change
        </Button>
        <Button
          variant={mode === "value-from-percentage" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("value-from-percentage"); setResult(null); }}
        >
          % of a value
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">{labels.first}</label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">{labels.second}</label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
      </div>

      <Button onClick={calculate} size="lg">{labels.btn}</Button>

      {result && (
        <div className="space-y-3">
          <ResultCard items={[{ label: "Result", value: result, highlight: true }]} columns={1} />
        </div>
      )}
    </div>
  );
}

