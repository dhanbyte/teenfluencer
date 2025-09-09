"use client";

import InfluencerNavbar from "@/Components/(Infuencer)/influencerNavbar";
import InfluencerHomePage from "../(Pages)/influencerhome/page";

function InfluencerPage() {
 

  // For signed-in users
  return (
    <div>
      <InfluencerNavbar />
      <InfluencerHomePage/>
    </div>
  );
}

export default InfluencerPage;