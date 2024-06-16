import { forwardRef, useImperativeHandle, useRef, useState } from "react";
const RegistrationModal = forwardRef(function RegistrationModal(props, ref) {
  const modal = useRef();
  const [inCorrect, setInCorrect] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      },
    };
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (data.password != data.confirmPassword) {
      setInCorrect(true);
    } else {
      setInCorrect(false);
    }
    modal.current.close();
  }

  return (
    <dialog className="modal" ref={modal}>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="username" name="username" />
        </div>
        <div>
          <input placeholder="password" name="password" />
        </div>
        <div>
          <input placeholder="confirm password" name="confirmPassword" />
        </div>
        {inCorrect && <p>Your passwords are not matching</p>}
        <button>Submit</button>
      </form>
    </dialog>
  );
});

export default RegistrationModal;
