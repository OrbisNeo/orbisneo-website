---
title: "AI checks AI: who is still accountable?"
translationKey: ai-controleert-ai
urlSlug: ai-checks-ai
description: "When AI reviews AI-generated work, accountability depends on people's understanding, time and authority to intervene. What should leaders put in place?"
pubDate: 2026-10-26
category: "AI in organisations"
author: "Daniel Fokker"
draft: false
heroImage: "../../../assets/blog/ai-controleert-ai-hero.jpg"
heroAlt: "Robot arms check each other's work on a production line while people watch beside a stop button"
---

Accountability means little if you cannot understand the work or intervene when it goes wrong. Otherwise your role has been reduced to signing off. That is my concern as AI increasingly reviews work produced by other AI systems. Anthropic's recent account of code review on the Claude Code team raises an organisational question: what do people need to know, and what authority must they retain, to remain accountable?

## What Anthropic describes

It starts with volume. In Anthropic's large central codebase, its monorepo, the number of changes per day went from about 2,500 in May to more than 30,000 in September, according to the company. Claude Code lives in a separate repository, but the pressure is rising there too. No team reads that volume line by line. So Anthropic asks a different question. Not "did a human read this?", but what could go wrong with this change, and which check, automated or human, is best placed to catch it?

The answer is a series of checks rather than one gate at the end. The AI first has to show that its work runs, with the output of a test, instead of just saying it is done. An AI reviewer then assesses every change. Automated checks block changes that fail the configured checks.

How many human reviewers are needed after that depends on the risk. A documentation change can go through without human approval, an ordinary change needs one person, and the most sensitive code needs two. That lighter route comes with conditions. Only trusted authors, mostly the team that owns the code, can use it. Anything the owners have marked as sensitive, such as the workflow files that run the automated build and test pipeline, always needs a person. An agent's approval never counts as a person's, and whoever prompted the AI owns the result. Anthropic sums it up in one sentence: "A person is accountable for every change that ships, whoever typed it."

## A lens from organisation theory

My reading of this approach is shaped by my studies in Nijmegen. In 2015 and 2016 I attended lectures at Radboud University by Jan Achterbergh and Dirk Vriens, and Vriens supervised my master's thesis. Together they wrote *Organizations: Social Systems Conducting Experiments* (Springer, 2009, revised edition 2010). They describe organisations as social systems that keep experimenting with their own survival, by adjusting their goals, their design and their processes. Regulation happens at three levels: choosing goals, designing the organisation and running the daily work. One of the building blocks is the Dutch sociotechnical school of Ulbo de Sitter.

Anthropic's approach reminds me of that sociotechnical idea: being able to detect and resolve problems as close to the work as possible. Anthropic describes a shift in its own team from a separate review stage to checks that run throughout the work, "more like spellcheck while you write", as the company puts it. But automated checking during the work is not the same as giving authority to the people who remain accountable for it. You can move checks technically closer to the work and at the same time reduce people's authority to make decisions. Both the technical design and the organisation around it shape that authority.

## What I recognise

Two parts of the approach stand out to me. When the automated reviewer keeps flagging the same issue, the team fixes it at the source, in the instructions for the AI or with a new rule. From the book's perspective, I read that as regulation by design. You stop handling the same finding again and again, and adjust the way of working to reduce the chance of the same mistake recurring. Anthropic also turns past incidents into a test the automated reviewer must pass every day. That incident history makes the test specific to your own systems and ways of working.

The order of these changes also matters. New features are released internally first, and most mistakes can be reversed within minutes. Their advice is to start strict and loosen only with evidence. In this software example, fast rollback is an important precondition for reducing human review. But not every consequence can be undone. Reverting the code cannot recover information that has already been disclosed. Anyone applying this approach outside software first needs to know which mistakes are reversible and which are not.

## How independent is the second AI?

Anthropic is candid about the quirks of an AI reviewer. It can flag too much, or go back and forth endlessly with the AI that wrote the code. One change went through more than fifty rounds of review and fixes in a single night, until someone stopped it. But there is a more fundamental issue. A second AI judgement is not automatically an independent check. Two agents can share the same wrong assumption or miss the same problem. You then get agreement without established quality. The value of a second AI review depends on which errors it catches and which blind spots it shares with the first. Which errors are caught by tests with a known outcome? Where is human judgement still needed? And who examines whether the writer and the reviewer share the same blind spot?

## Another reading

AI commentator David Shapiro discussed the same post on YouTube and reached a conclusion close to mine: "The principle underneath all of this is not new at all." He points to engineering and bookkeeping, where machines have long checked each other and people design the checks. Then he goes a step further. He expects agents that work, supervise, coordinate and audit, with "an org chart all of their own", and eventually a fully automated technical layer, followed by the business layer.

This is where I disagree. Testing against a chosen standard is different from deciding which standard is appropriate. A machine can verify whether work meets what was agreed. But what counts as good enough, for whom and why, is a choice that has to be made again and again. AI can support that conversation with analysis, scenarios and challenging questions. People remain responsible for choosing and revising the standards. Anthropic, too, deliberately leaves the decision whether to build something with people.

## Accountability without authority

My biggest concern is what is left for people. When machines do the work, the checking and the coordination, human accountability can slowly be hollowed out. Someone remains formally accountable, but no longer sees what is happening and has no means to intervene. Responsibility gets spread so thinly across people and systems that nobody really carries it. That is my reading of the risk. Organisation theory forces you to look at who has which information and who is allowed to intervene. Anthropic has a good rule for this: if you cannot say what the checks would miss, ask for a real review rather than a quick approval. But a rule is not a guarantee. Some implementation tasks are taking less effort, while judgement and accountability still demand attention. People need time to exercise that judgement.

## The question for the board

Leadership teams should look beyond the name on the approval. Can that person assess the result, require changes to the checks and halt the work? Do they have time to do so? Those are the conditions that turn formal accountability into something a person can actually exercise.

## Sources

- [Anthropic: How the Claude Code team does code review (15 October 2026)](https://claude.dev/blog/solving-code-review-at-anthropic/)
- [Jan Achterbergh and Dirk Vriens: Organizations: Social Systems Conducting Experiments (Springer, revised edition 2010)](https://link.springer.com/book/10.1007/978-3-642-14316-8)
- [David Shapiro: Anthropic Is Living In The Future (YouTube, 24 October 2026)](https://youtu.be/VmrNsOVOAt4)
