import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "../../ui/dialog";

const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("giftCardDisclaimerAccepted");
    if (!hasAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleProceed = () => {
    localStorage.setItem("giftCardDisclaimerAccepted", "true");
    setShowDisclaimer(false);
  };

  return (
    <Dialog open={showDisclaimer}>
      <DialogOverlay>
        <DialogContent className="flex flex-col gap-6 p-4 md:p-6 max-md:pt-10 max-w-screen max-md:h-full md:max-w-[603px] overflow-y-auto [&>button.absolute]:hidden">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-semibold">
              Sell Gift Cards
            </h2>
            <h3 className="text-2xl text-center font-bold  text-[#7910B1]">
              Disclaimer
            </h3>
          </div>
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Nam feugiat urna pulvinar
              gravida massa id. Quis in nibh bibendum auctor morbi ornare nisl
              ullamcorper eget. Mauris pellentesque dictum habitasse ut hac
              ultricies purus. Facilisis quam at justo ut aliquam nunc pharetra
              at urna. Tristique dignissim ipsum sit quam donec eget commodo
              molestie interdum.
            </p>
            <p className="text-sm text-gray-700">
              Ridiculus consequat pellentesque leo faucibus leo pretium tempor
              vitae ultricies. Mi imperdiet amet nisi maecenas blandit mattis
              eleifend dis venenatis. Sed quam sit massa sapien ipsum diam
              cursus pharetra.
            </p>
            <p className="text-sm text-gray-700">
              Ipsum vel diam hendrerit eleifend massa. Amet scelerisque neque
              morbi arcu euismod sed facilisis. Eget sem id facilisis quis vel
              elementum ut sagittis ac. In lorem consectetur nulla morbi
              tincidunt. Mi ullamcorper lectus consectetur tincidunt nec semper
              nunc. Vel sollicitudin egestas cursus sem donec dui aliquet id
              urna. Purus sit mi turpis facilisis. Nunc commodo nunc in vitae
              tempor ultrices platea mi.
            </p>
          </div>
          <button
            onClick={handleProceed}
            className="btn-primary max-sm:pt-5 w-full"
          >
            Proceed
          </button>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Disclaimer;
