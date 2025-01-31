export function NoPosts({ openModal }: { openModal: () => void }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16l4-4m0 0l4-4m-4 4v12"
            />
          </svg>
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-700">
          No Posts Yet
        </h2>
        <p className="text-center text-gray-500">
          Start creating your first post to engage with your audience.
        </p>
        <button
          onClick={openModal}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create Post
        </button>
      </div>
    </div>
  );
}
