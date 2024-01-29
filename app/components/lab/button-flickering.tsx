export const ButtonFlickeringLight = () => {
  return (
    <div className="rounded-lg border p-24 flex items-center justify-center">
      <button>
        <div className="light" />
        Hover here
      </button>
      <style jsx>{`
        button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.25rem;
          border-radius: 0.375rem;
          background-color: #101017;
          color: #eeeeee;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        button:hover .light:before {
          box-shadow: 0 0 80px 30px #4338ca;
          opacity: 0.8;
        }

        .light {
          z-index: -1;
        }

        .light:before {
          border-radius: 0.375rem;
          transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
          content: "";
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          transform: scale(1);
          animation: flickering-light 4s infinite;
          box-shadow: 0 0 60px 10px #4338ca;
          opacity: 0.4;
        }

        @keyframes flickering-light {
          0% {
            opacity: 0.8;
          }
          3% {
            opacity: 0.4;
          }
          5% {
            opacity: 0.8;
          }
          15% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};
