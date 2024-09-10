import { ObjectsList } from "./components/ObjectsList";
import { WorkingPalette } from "./components/WorkingPalette";

export default function IndexPage() {
  return (
      <div className="md:flex">
        <ObjectsList/>
        <WorkingPalette/>
      </div>
  );
}
