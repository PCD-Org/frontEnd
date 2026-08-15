import { AlertTriangle } from "lucide-react";
import { useTranslation } from "../../../utils/useTranslation";
import Button from "./Button";

export default function ErrorState({ message, onRetry }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 px-6 py-12 text-center">
      <AlertTriangle size={22} className="text-red-600" aria-hidden="true" />
      <p className="text-sm font-semibold text-red-700">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {t("common.retry")}
        </Button>
      )}
    </div>
  );
}
