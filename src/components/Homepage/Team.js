import React from "react";

const Team = () => {
    return (
        <div className="mb-36" id="aboutus">
            <div className="text-center text-white font-bold text-4xl mb-16 pt-12">
                <h2>Meet our Team Members</h2>
            </div>
            <div className="grid grid-cols-3 content-center items-center self-center place-content-center place-items-center  gap-16">
                <div className="rounded-xl">
                    {/* <img src="" alt="" /> */}
                    <img className="w-64 rounded-xl mb-3" src="https://pps.whatsapp.net/v/t61.24694-24/323974366_864356134778291_6403002447665780126_n.jpg?ccb=11-4&oh=01_AdSvV3z7bSTcohn_Ep4KIY14VXldjQm1G29ZKtzttoRHXA&oe=63E2819A" alt="Member" />
                    <h4 className="text-white text-center mb-1">Pulkit Tuteja</h4>
                    <h5 className="text-navText text-center">Co-Founder/CEO</h5>
                </div>
                <div>
                    <img className="w-64 rounded-xl mb-3" src="https://media.licdn.com/dms/image/C4E03AQHwDMcePkxyUw/profile-displayphoto-shrink_800_800/0/1598697109996?e=1677715200&v=beta&t=kiMlCQuLWPhjagIO9p7zcdjfimN1MX_xzBPJKo0jiwQ" alt="Member" />
                    <h4 className="text-white text-center mb-1">Harsh Sukhija</h4>
                    <h5 className="text-navText text-center">Co-Founder/CTO</h5>
                </div>
                {/* <div>
                    <img className="w-64 rounded-xl mb-3" src="https://instagram.fagr1-1.fna.fbcdn.net/v/t51.2885-19/299817227_1147999089093092_832147078133806232_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fagr1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=tJwd75rHUgwAX-F4ayw&tn=3500vo-kz_l5gxIv&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAPRlDKZmSH57HjjntgGzoxglWbN1sQYN_FSuya3hdA8g&oe=63B04D9E&_nc_sid=8fd12b" alt="Member" />
                    <h4 className="text-white text-center mb-1">Anuj Kumar</h4>
                    <h5 className="text-navText text-center">Co-Founder/CTO</h5>
                </div> */}
            </div>
        </div>
    );
}

export default Team;