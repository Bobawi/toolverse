import Link from "next/link";
import { BlogPost } from "@/types";

export default function BlogArticle({ post }: { post: BlogPost }) {
    return (
        <article className="space-y-8">
            {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                    {section.heading && (
                        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                            {section.heading}
                        </h2>
                    )}

                    {section.paragraphs?.map((para, i) => (
                        <p key={i} className="leading-relaxed text-muted">
                            {para}
                        </p>
                    ))}

                    {section.list && (
                        <ul className="space-y-2">
                            {section.list.map((item, i) => (
                                <li key={i} className="flex gap-3 text-muted">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {section.tip && (
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                            <p className="text-sm font-semibold text-primary">
                                💡 Tip
                            </p>
                            <p className="mt-1 text-sm text-foreground">
                                {section.tip}
                            </p>
                        </div>
                    )}

                    {section.toolCta && (
                        <div className="rounded-xl border border-border bg-muted/5 p-5">
                            <Link
                                href={`/tools/${section.toolCta.slug}`}
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                            >
                                🛠 {section.toolCta.text}
                            </Link>
                        </div>
                    )}

                    {section.faq && (
                        <div className="space-y-3 pt-2">
                            {section.faq.map((item, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-border bg-background p-4"
                                >
                                    <h3 className="text-sm font-semibold text-foreground">
                                        {item.question}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            ))}
        </article>
    );
}

