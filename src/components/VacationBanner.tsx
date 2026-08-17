import { VACATION_MESSAGE } from "@/lib/siteConfig";

export default function VacationBanner() {
  return (
    <div className="vacation-banner" role="status">
      {VACATION_MESSAGE}
    </div>
  );
}
