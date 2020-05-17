<?php

namespace App\Http\Controllers;

use App\Http\Resources\ViewQuestion;
use App\Question;
use App\Reply;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index');
        $this->authorizeResource(Reply::class, 'reply');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Question $question
     */
    public function index(Question $question)
    {
        return \App\Http\Resources\Reply::collection($question->replies);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Question $question
     * @param \Illuminate\Http\Request $request
     * @return \App\Http\Resources\Reply
     */
    public function store(Request $request, Question $question)
    {
        $reply = Reply::create([
            'question_id' => $question->id,
            'user_id' => $request->user()->id,
            'text' => $request->text,
        ]);

        $question->reply_count++;
        $question->save();

        return new \App\Http\Resources\Reply($reply);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Reply $reply
     */
    public function update(Request $request, Reply $reply)
    {
        $reply->update($request->only(['text']));

        return new \App\Http\Resources\Reply($reply);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Question $question
     * @param \App\Reply $reply
     */
    public function markAsAnswer(Request $request, Question $question, Reply $reply)
    {
        $reply->update([
            'is_answer' => true,
        ]);

        return new ViewQuestion($question);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Reply $reply
     */
    public function destroy(Reply $reply)
    {
        $question = $reply->question;
        $question->reply_count--;
        $question->save();

        $reply->delete();

        return response()->json(null, 204);
    }
}
