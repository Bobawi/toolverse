"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ResultCard from "@/components/ui/ResultCard";

type Unit = "metric" | "imperial";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    if (!height || !weight) return;

    let bmi: number;
    if (unit === "metric") {
      const h = Number(height) / 100;
      bmi = Number(weight) / (h * h);
    } else {
      bmi = (Number(weight) / (Number(height) * Number(height))) * 703;
    }

    bmi = Math.round(bmi * 10) / 10;

    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-amber-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }

    setResult({ bmi, category, color });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button
          variant={unit === "metric" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setUnit("metric"); setResult(null); }}
        >
          Metric (cm / kg)
        </Button>
        <Button
          variant={unit === "imperial" ? "primary" : "outline"}
          size="sm"
          onClick={() => { setUnit("imperial"); setResult(null); }}
        >
          Imperial (in / lb)
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Height ({unit === "metric" ? "cm" : "inches"})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 175" : "e.g. 69"}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Weight ({unit === "metric" ? "kg" : "pounds"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          />
        </div>
      </div>

      <Button onClick={calculate} size="lg">
        Calculate BMI
      </Button>

      {result && (
        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
          <ResultCard
            items={[
              { label: "Your BMI", value: result.bmi.toString(), highlight: true },
              { label: "Category", value: result.category },
            ]}
            columns={2}
          />
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min((result.bmi / 40) * 100, 100)}%`,
                background:
                  result.bmi < 18.5
                    ? "#3B82F6"
                    : result.bmi < 25
                      ? "#22C55E"
                      : result.bmi < 30
                        ? "#F59E0B"
                        : "#EF4444",
              }}
            />
          </div>
          <p className="text-center text-xs text-muted">
            BMI categories: Underweight {'<'} 18.5 | Normal 18.5-24.9 | Overweight 25-29.9 | Obese {'>='} 30
          </p>
        </div>
      )}
    </div>
  );
}

