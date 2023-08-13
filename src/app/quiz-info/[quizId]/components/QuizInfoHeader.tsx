export default function QuizInfoHeader({ topic }: { topic: string }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center gap-5">
      <h1 className="title">Quiz info</h1>
      <p className="font-semibold">
        <span className="text-base sm:hidden">Topic:</span>
        <span className="ml-2 text-base bg-primary py-1 px-2 rounded-lg text-white">
          {topic}
        </span>
      </p>
    </header>
  );
}
