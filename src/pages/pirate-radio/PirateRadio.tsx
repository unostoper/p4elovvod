import { Routes, Route } from "react-router-dom";
import PirateRadioLayout from "./PirateRadioLayout";
import PirateHome from "./PirateHome";
import PiratePlaylists from "./PiratePlaylists";
import PirateHistory from "./PirateHistory";
import PirateGuestbook from "./PirateGuestbook";
import PirateDownloads from "./PirateDownloads";
import PirateContacts from "./PirateContacts";

const PirateRadio = () => (
  <PirateRadioLayout>
    <Routes>
      <Route index element={<PirateHome />} />
      <Route path="playlists" element={<PiratePlaylists />} />
      <Route path="history" element={<PirateHistory />} />
      <Route path="guestbook" element={<PirateGuestbook />} />
      <Route path="downloads" element={<PirateDownloads />} />
      <Route path="contacts" element={<PirateContacts />} />
    </Routes>
  </PirateRadioLayout>
);

export default PirateRadio;
