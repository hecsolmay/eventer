import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export class SchemaValidationError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'SchemaValidationError'
  }
}

export function handleResponseError (error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2023') {
      return NextResponse.json(
        {
          success: false,
          message: error.meta?.message ?? 'Invalid request',
          code: 400
        },
        {
          status: 400
        }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: error.meta?.message ?? 'Something went wrong',
        code: 400
      },
      {
        status: 400
      }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        code: 500
      },
      {
        status: 500
      }
    )
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Internal server error',
      code: 500
    },
    {
      status: 500
    }
  )
}
