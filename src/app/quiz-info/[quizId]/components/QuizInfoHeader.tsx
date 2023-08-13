export default function QuizInfoHeader({ topic }: { topic: string }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center">
      <h1 className="title">Quiz info</h1>
      <p className="ml-3 font-semibold">
        <span className="text-base sm:hidden">Topic:</span>
        <span className="text-base bg-primary py-1 px-2 rounded-lg text-white">
          {topic}
        </span>
      </p>
    </header>
  );
}
