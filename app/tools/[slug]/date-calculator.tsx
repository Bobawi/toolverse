"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ResultCard from "@/components/ui/ResultCard";

type Mode = "difference" | "add-subtract";

export default function DateCalculator() {
  const [mode, setMode] = useState<Mode>("difference");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [days, setDays] = useState(0);
  const [result, setResult] = useState<{ label: string; value: string; highlight?: boolean }[] | null>(null);

  const calcDifference = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const remainingDays = totalDays % 30;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const weeks = Math.floor(totalDays / 7);

    setResult([
      { label: "Total Days", value: totalDays.toString(), highlight: true },
      { label: "Years", value: years.toString() },
      { label: "Months", value: months.toString() },
      { label: "Weeks", value: weeks.toString() },
      { label: "Days", value: remainingDays.toString() },
      { label: "Hours", value: hours.toString() },
      { label: "Minutes", value: minutes.toString() },
    ]);
  };

  const calcAddSubtract = () => {
    if (!date1) return;
    const d = new Date(date1);
    if (operation === "add") {
      d.setDate(d.getDate() + days);
    } else {
      d.setDate(d.getDate() - days);
    }
    setResult([
      {
        label: `Date after ${operation === "add" ? "+" : "-"}${days} days`,
        value: d.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        highlight: true,
      },
    ]);
  };

  const handleCalc = () => {
    if (mode === "difference") calcDifference();
    else calcAddSubtract();
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-3">
        <Button
          variant={mode === "difference" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("difference"); setResult(null); }}
        >
          Date Difference
        </Button>
        <Button
          variant={mode === "add-subtract" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setMode("add-subtract"); setResult(null); }}
        >
          Add / Subtract Days
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Start Date
          </label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>

        {mode === "difference" ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              End Date
            </label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            />
          </div>
        ) : (
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Days
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min={1}
                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as typeof operation)}
                className="rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleCalc} size="lg">
        Calculate
      </Button>

      {result && <ResultCard items={result} columns={mode === "difference" ? 3 : 1} />}
    </div>
  );
}

