<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionsCollection;
use App\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new QuestionsCollection(
            Question::orderBy('created_at', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $question = Question::create([
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return new \App\Http\Resources\Question($question);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Question  $question
     */
    public function show(Question $question)
    {
        $question->views_count++;
        $question->save();

        return new \App\Http\Resources\Question($question);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Question  $question
     */
    public function update(Request $request, Question $question)
    {
        if ($request->user()->id !== $request->user_id) {
            return response()->json(['error' => 'You can only edit your own books.'], 403);
        }

        $question->update($request->only(['title', 'body', 'category_id']));

        return new \App\Http\Resources\Question($question);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Question $question
     * @throws \Exception
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return response()->json(null, 204);
    }
}
