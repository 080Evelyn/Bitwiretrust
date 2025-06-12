import { illustration } from "@/assets";
import { ModalType } from "@/types";
import { IoMdCopy } from "react-icons/io";

interface InviteProps {
  toggleModal: (modal: ModalType) => void;
  copyReferralCode: () => void;
}

const Invite = ({ toggleModal, copyReferralCode }: InviteProps) => {
  return (
    <div className="modal invite-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("profile")}>
          Back
        </button>
        <h3>Invite Friends</h3>
      </div>

      <div className="invite-content">
        <div className="invite-illustration">
          <div className="invite-graphic">
            <div className="people-circles">
              <img src={illustration} alt="illustration" />
            </div>
          </div>
        </div>

        <h4>Get Rewarded for Inviting Users</h4>
        <p>Refer friends to Bitwire Trust and earn referral bonuses</p>

        <div className="referral-code">
          <code>bitwirejoneswie3iu44</code>
          <button className="copy-btn" onClick={copyReferralCode}>
            Copy <IoMdCopy />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
